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

    debugger;

    for (const line of lines) {
      // Check if this line starts a new message (matches WhatsApp format)
      const messageMatch = line.match(/^\[(\d{1,2}\.\d{1,2}\.\d{2,4}),\s+(\d{1,2}:\d{2}:\d{2})\]\s+(.+?):\s*(.+)$/);
      
      if (messageMatch) {
        // Save previous row if exists
        if (currentRow && currentContent.length > 0) {
          currentRow.content = currentContent.join('\n');
          rows.push(currentRow as ChatRow);
        }

        // Start new row
        const [, dateStr, timeStr, sender, content] = messageMatch;
        const timestamp = ChatParser.parseTimestamp(dateStr, timeStr);
        
        currentRow = {
          id: ChatParser.generateId(),
          timestamp,
          sender: sender.trim(),
          content: content.trim(),
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

    return rows;
  }

  /**
   * Parse timestamp from date and time strings
   */
  private static parseTimestamp(dateStr: string, timeStr: string): Date {
    // Handle DD.MM.YY format
    const [day, month, year] = dateStr.split('.');
    const fullYear = year.length === 2 ? `20${year}` : year;
    const date = new Date(parseInt(fullYear), parseInt(month) - 1, parseInt(day));

    // Parse time (HH:MM:SS format)
    const [hours, minutes, seconds] = timeStr.split(':');
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
