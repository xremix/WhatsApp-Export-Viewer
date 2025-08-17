import JSZip from 'jszip';
import { ChatRow, ChatRowType, ChatRowMetadata } from '../types/index.js';

export class ChatParser {
  /**
   * Parse a WhatsApp export ZIP file
   * @param file - The ZIP file to parse
   * @returns Array of parsed ChatRow objects
   */
  static async parseZipFile(file: File): Promise<ChatRow[]> {
    try {
      // Create a new JSZip instance
      const zip = new JSZip();
      
      // Load the ZIP file
      const zipContent = await zip.loadAsync(file);
      
      // Find text files in the ZIP
      const textFiles: string[] = [];
      
      zip.forEach((relativePath, zipEntry) => {
        if (zipEntry.name.toLowerCase().endsWith('.txt')) {
          textFiles.push(zipEntry.name);
        }
      });
      
      if (textFiles.length === 0) {
        throw new Error('No text files found in the ZIP file');
      }
      
      // Read the first text file found
      const firstTextFile = textFiles[0];
      const textContent = await zipContent.file(firstTextFile)?.async('string');
      
      if (!textContent) {
        throw new Error('Could not read the text file content');
      }
      
      // Parse the text content into ChatRow objects
      const chatRows = ChatParser.parseFromText(textContent);
      
      return chatRows;
      
    } catch (error) {
      console.error('Error parsing ZIP file:', error);
      alert(`Error parsing ZIP file: ${error instanceof Error ? error.message : 'Unknown error'}`);
      throw error;
    }
  }

  /**
   * Parse WhatsApp chat text into ChatRow objects
   * @param text - The raw chat text content
   * @returns Array of parsed ChatRow objects
   */
  static parseFromText(text: string): ChatRow[] {
    const lines = text.split('\n').filter(line => line.trim() !== '');
    const rows: ChatRow[] = [];
    let currentRow: Partial<ChatRow> | null = null;
    let currentContent: string[] = [];

    for (const line of lines) {
      // Check if this line starts a new message (matches WhatsApp format)
      // Format: [DD.MM.YY, HH:MM:SS] Name: Message
      const messageMatch = line.match(/^\[(\d{1,2}\.\d{1,2}\.\d{2,4}),\s*(\d{1,2}:\d{2}:\d{2})\]\s+(.+?):\s*(.+)$/);
      
      if (messageMatch) {
        // Save previous row if exists
        if (currentRow && currentContent.length > 0) {
          currentRow.content = currentContent.join('\n');
          rows.push(currentRow as ChatRow);
        }

        // Start new row
        const [, dateStr, timeStr, sender, content] = messageMatch;
        
        // Validate that we have all required parts
        if (!dateStr || !timeStr || !sender || content === undefined) {
          console.warn('Invalid message format, skipping line:', line);
          continue;
        }
        
        const timestamp = ChatParser.parseTimestamp(dateStr, timeStr);
        
        currentRow = {
          id: ChatParser.generateId(),
          timestamp,
          sender: sender.trim(),
          content: '',
          type: ChatRowType.MESSAGE,
          metadata: ChatParser.parseMetadata(content)
        };
        
        currentContent = [content.trim()];
      } else {
        // This is a continuation of the previous message
        if (currentRow) {
          currentContent.push(line.trim());
        }
      }
    }

    // Add the last row
    if (currentRow && currentContent.length > 0) {
      currentRow.content = currentContent.join('\n');
      rows.push(currentRow as ChatRow);
    }

    // Now process all rows to split messages that contain embedded timestamps
    return ChatParser.splitEmbeddedMessages(rows);
  }

  /**
   * Automatically identify the own name (second unique sender) from chat messages
   * @param rows - Array of ChatRow objects
   * @returns The own name (second unique sender)
   */
  static identifyOwnName(rows: ChatRow[]): string {
    // Get unique senders (excluding system messages)
    const senders = [...new Set(
      rows
        .filter(row => !row.metadata?.isSystemMessage)
        .map(row => row.sender)
    )];
    
    // Return the second sender if available, otherwise the first
    return senders.length >= 2 ? senders[1] : senders[0] || 'Unknown';
  }

  /**
   * Split messages that contain embedded timestamp patterns
   * @param rows - Array of ChatRow objects
   * @returns Array of ChatRow objects with embedded messages split
   */
  private static splitEmbeddedMessages(rows: ChatRow[]): ChatRow[] {
    const result: ChatRow[] = [];
    
    for (const row of rows) {
      const content = row.content;
      
      // Find all timestamp patterns in the content
      const timestampPattern = /\[(\d{1,2}\.\d{1,2}\.\d{2,4}),\s*(\d{1,2}:\d{2}:\d{2})\]\s+(.+?):\s*(.+)/g;
      const matches = Array.from(content.matchAll(timestampPattern));
      
      if (matches.length === 0) {
        // No embedded timestamps, keep as is
        result.push(row);
        continue;
      }
      
      // Split the content at each timestamp
      let lastIndex = 0;
      let currentContent = '';
      
      for (const match of matches) {
        const matchIndex = match.index!;
        
        // Add content before this timestamp to the current message
        currentContent += content.substring(lastIndex, matchIndex);
        
        // If we have content, save the current message
        if (currentContent.trim()) {
          const splitRow: ChatRow = {
            ...row,
            id: ChatParser.generateId(),
            content: currentContent.trim()
          };
          result.push(splitRow);
        }
        
        // Start new message from this timestamp
        const [, dateStr, timeStr, sender, messageContent] = match;
        const timestamp = ChatParser.parseTimestamp(dateStr, timeStr);
        
        const newRow: ChatRow = {
          id: ChatParser.generateId(),
          timestamp,
          sender: sender.trim(),
          content: messageContent.trim(),
          type: ChatRowType.MESSAGE,
          metadata: ChatParser.parseMetadata(messageContent)
        };
        
        result.push(newRow);
        
        // Update for next iteration
        lastIndex = matchIndex + match[0].length;
        currentContent = '';
      }
      
      // Add any remaining content after the last timestamp
      const remainingContent = content.substring(lastIndex);
      if (remainingContent.trim()) {
        const finalRow: ChatRow = {
          ...row,
          id: ChatParser.generateId(),
          content: remainingContent.trim()
        };
        result.push(finalRow);
      }
    }
    
    return result;
  }

  /**
   * Parse timestamp from date and time strings
   */
  private static parseTimestamp(dateStr: string, timeStr: string): Date {
    // Handle DD.MM.YY format (e.g., 14.04.14)
    const [day, month, year] = dateStr.split('.');
    
    // Validate date parts
    if (!day || !month || !year) {
      throw new Error(`Invalid date format: ${dateStr}`);
    }
    
    // Handle 2-digit years (assume 20xx for years < 50, 19xx for years >= 50)
    let fullYear: string;
    if (year.length === 2) {
      const yearNum = parseInt(year);
      fullYear = yearNum < 50 ? `20${year}` : `19${year}`;
    } else {
      fullYear = year;
    }
    
    const date = new Date(parseInt(fullYear), parseInt(month) - 1, parseInt(day));

    // Parse time (HH:MM:SS format)
    const [hours, minutes, seconds] = timeStr.split(':');
    
    // Validate time parts
    if (!hours || !minutes || !seconds) {
      throw new Error(`Invalid time format: ${timeStr}`);
    }
    
    date.setHours(parseInt(hours), parseInt(minutes), parseInt(seconds));

    return date;
  }

  /**
   * Parse metadata from message content
   */
  private static parseMetadata(content: string): ChatRowMetadata {
    const metadata: ChatRowMetadata = {
      isSystemMessage: false,
      hasAttachment: false
    };

    // Check for system messages
    if (content.includes('Messages and calls are end-to-end encrypted') ||
        content.includes('You deleted this message') ||
        content.includes('This message was deleted') ||
        content.includes('You changed the group description') ||
        content.includes('You changed this group\'s icon') ||
        content.includes('You added') ||
        content.includes('You removed') ||
        content.includes('You left') ||
        content.includes('You joined')) {
      metadata.isSystemMessage = true;
    }

    // Check for media attachments
    if (content.includes('<attached:') || 
        content.includes('image omitted') ||
        content.includes('video omitted') ||
        content.includes('audio omitted') ||
        content.includes('document omitted') ||
        content.includes('sticker omitted')) {
      metadata.hasAttachment = true;
      
      if (content.includes('image omitted')) metadata.attachmentType = 'image';
      else if (content.includes('video omitted')) metadata.attachmentType = 'video';
      else if (content.includes('audio omitted')) metadata.attachmentType = 'audio';
      else if (content.includes('document omitted')) metadata.attachmentType = 'document';
      else if (content.includes('sticker omitted')) metadata.attachmentType = 'sticker';
    }

    // Check for edited messages
    if (content.includes('(edited)')) {
      metadata.edited = true;
    }

    // Check for deleted messages
    if (content.includes('You deleted this message') || 
        content.includes('This message was deleted')) {
      metadata.deleted = true;
    }

    return metadata;
  }

  /**
   * Generate a unique ID for chat rows
   */
  private static generateId(): string {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
