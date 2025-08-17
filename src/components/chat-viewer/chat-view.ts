import { ChatRow, AttachmentType } from '../../types/index.js';

export class ChatView {
  private container: HTMLElement;
  private messages: ChatRow[] = [];
  private ownName: string;
  private currentSearchIndex: number = -1;
  private searchResults: number[] = [];
  private lastSearchTerm: string = '';

  constructor(container: HTMLElement, ownName: string) {
    this.container = container;
    this.ownName = ownName;
    this.render();
  }

  setMessages(messages: ChatRow[]) {
    this.messages = messages;
    this.render();
  }

  updateOwnName(ownName: string) {
    this.ownName = ownName;
    this.render();
  }

  searchMessages(searchTerm: string): number {
    if (!searchTerm.trim()) {
      this.clearSearch();
      return 0;
    }

    // Only reset search if the term has changed
    if (searchTerm !== this.lastSearchTerm) {
      this.searchResults = [];
      this.currentSearchIndex = -1;
      this.lastSearchTerm = searchTerm;
      
      const term = searchTerm.toLowerCase();

      // Find all messages containing the search term
      this.messages.forEach((message, index) => {
        const content = message.content.toLowerCase();
        const sender = message.sender.toLowerCase();
        
        if (content.includes(term) || sender.includes(term)) {
          this.searchResults.push(index);
        }
      });

      // Highlight search results
      this.highlightSearchResults();
    }

    return this.searchResults.length;
  }

  searchNext(): boolean {
    if (this.searchResults.length === 0) {
      return false;
    }

    // Move to next result
    this.currentSearchIndex = (this.currentSearchIndex + 1) % this.searchResults.length;
    const messageIndex = this.searchResults[this.currentSearchIndex];
    
    // Scroll to the message
    this.scrollToMessage(messageIndex);
    
    // Update highlighting
    this.highlightSearchResults();
    
    return true;
  }

  searchPrevious(): boolean {
    if (this.searchResults.length === 0) {
      return false;
    }

    // Move to previous result
    this.currentSearchIndex = this.currentSearchIndex <= 0 
      ? this.searchResults.length - 1 
      : this.currentSearchIndex - 1;
    const messageIndex = this.searchResults[this.currentSearchIndex];
    
    // Scroll to the message
    this.scrollToMessage(messageIndex);
    
    // Update highlighting
    this.highlightSearchResults();
    
    return true;
  }

  clearSearch() {
    this.searchResults = [];
    this.currentSearchIndex = -1;
    this.lastSearchTerm = '';
    this.removeSearchHighlights();
  }

  getCurrentSearchIndex(): number {
    return this.currentSearchIndex;
  }

  private highlightSearchResults() {
    this.removeSearchHighlights();
    
    if (this.searchResults.length === 0) {
      return;
    }

    const messageElements = this.container.querySelectorAll('.message-wrapper');
    
    // Highlight all search results
    this.searchResults.forEach(index => {
      if (messageElements[index]) {
        messageElements[index].classList.add('search-result');
      }
    });

    // Highlight current result
    if (this.currentSearchIndex >= 0 && this.currentSearchIndex < this.searchResults.length) {
      const currentIndex = this.searchResults[this.currentSearchIndex];
      if (messageElements[currentIndex]) {
        messageElements[currentIndex].classList.add('search-current');
      }
    }
  }

  private removeSearchHighlights() {
    const messageElements = this.container.querySelectorAll('.message-wrapper');
    messageElements.forEach(element => {
      element.classList.remove('search-result', 'search-current');
    });
  }

  private scrollToMessage(messageIndex: number) {
    const messageElements = this.container.querySelectorAll('.message-wrapper');
    const targetElement = messageElements[messageIndex] as HTMLElement;
    
    if (targetElement) {
      // Calculate the scroll position to center the message
      const containerRect = this.container.getBoundingClientRect();
      const elementRect = targetElement.getBoundingClientRect();
      const scrollTop = targetElement.offsetTop - containerRect.height / 2 + elementRect.height / 2;
      
      this.container.scrollTo({
        top: scrollTop,
        behavior: 'smooth'
      });
    }
  }

  private render() {
    const messagesHtml = this.messages.map(message => this.createMessageHtml(message)).join('');
    
    this.container.innerHTML = `
      <div class="chat-container">
        ${messagesHtml}
      </div>
    `;
    
    // Scroll to the bottom after rendering
    this.scrollToBottom();
    
    // Re-apply search highlighting if there are active search results
    if (this.searchResults.length > 0) {
      this.highlightSearchResults();
    }
  }

  private createMessageHtml(message: ChatRow): string {
    if (message.metadata?.isSystemMessage) {
      return `
        <div class="message-wrapper system-message">
          <div class="system-message-content">
            ${this.processLinks(message.content)}
          </div>
        </div>
      `;
    }

    const isOwnMessage = message.sender === this.ownName;
    const messageClass = isOwnMessage ? 'own-message' : 'other-message';
    
    // Handle attachments
    let attachmentHtml = '';

    if (message.metadata?.hasAttachment && message.metadata?.attachmentData) {
      if (message.metadata?.attachmentType === 'image' as AttachmentType) {
        attachmentHtml = `
          <div class="message-image">
            <img src="${message.metadata.attachmentData}" alt="Attachment" />
          </div>
        `;
      } else if (message.metadata?.attachmentType === 'document' as AttachmentType) {
        // For documents, create a clickable link that opens in new tab
        const filename = message.metadata.attachmentFilename || 'Document';
        attachmentHtml = `
          <div class="message-document">
            <a href="${message.metadata.attachmentData}" target="_blank" rel="noopener noreferrer" class="document-link">
              <div class="document-icon">📄</div>
              <div class="document-info">
                <div class="document-name">${this.escapeHtml(filename)}</div>
                ${message.metadata.attachmentSize ? `<div class="document-size">${this.formatFileSize(message.metadata.attachmentSize)}</div>` : ''}
              </div>
            </a>
          </div>
        `;
      }
    }
    
    const senderHtml = isOwnMessage ? '' : `
      <div class="message-sender">
        ${this.escapeHtml(message.sender)}
      </div>
    `;
    
    return `
      <div class="message-wrapper ${messageClass}">
        <div class="message-bubble">
          ${senderHtml}
          ${attachmentHtml}
          <div class="message-content">
            ${this.processLinks(message.content)}
          </div>
          <div class="message-timestamp">
            ${this.formatDate(message.timestamp)} at ${this.formatTime(message.timestamp)}
          </div>
        </div>
      </div>
    `;
  }

  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  private processLinks(text: string): string {
    // URL regex pattern that matches http/https URLs
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    
    return text.replace(urlRegex, (url) => {
      // Escape the URL to prevent XSS
      const escapedUrl = this.escapeHtml(url);
      return `<a href="${escapedUrl}" target="_blank" rel="noopener noreferrer">${escapedUrl}</a>`;
    });
  }

  private formatTime(date: Date): string {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    const displayMinutes = minutes.toString().padStart(2, '0');
    return `${displayHours}:${displayMinutes} ${ampm}`;
  }

  private formatDate(date: Date): string {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  }

  private scrollToBottom() {
    // Use requestAnimationFrame to ensure DOM is updated before scrolling
    requestAnimationFrame(() => {
      this.container.scrollTop = this.container.scrollHeight;
    });
  }

  private formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}
