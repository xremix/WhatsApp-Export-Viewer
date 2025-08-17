import { ChatRow, AttachmentType } from '../../types/index.js';

export class ChatView {
  private container: HTMLElement;
  private messages: ChatRow[] = [];
  private ownName: string;

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

  private render() {
    const messagesHtml = this.messages.map(message => this.createMessageHtml(message)).join('');
    
    this.container.innerHTML = `
      <div class="chat-container">
        ${messagesHtml}
      </div>
    `;
    
    // Scroll to the bottom after rendering
    this.scrollToBottom();
  }

  private createMessageHtml(message: ChatRow): string {
    if (message.metadata?.isSystemMessage) {
      return `
        <div class="message-wrapper system-message">
          <div class="system-message-content">
            ${this.escapeHtml(message.content)}
          </div>
        </div>
      `;
    }

    const isOwnMessage = message.sender === this.ownName;
    const messageClass = isOwnMessage ? 'own-message' : 'other-message';
    
    // Handle image attachments
    let imageHtml = '';
    if(message.metadata?.hasAttachment){
      debugger;
    }
    if (message.metadata?.hasAttachment && 
        message.metadata?.attachmentType === 'image' as AttachmentType && 
        message.metadata?.attachmentData) {
      imageHtml = `
        <div class="message-image">
          <img src="${message.metadata.attachmentData}" alt="Attachment" />
        </div>
      `;
    }
    
    return `
      <div class="message-wrapper ${messageClass}">
        <div class="message-bubble">
          <div class="message-sender">
            ${this.escapeHtml(message.sender)}
          </div>
          ${imageHtml}
          <div class="message-content">
            ${this.escapeHtml(message.content)}
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
}
