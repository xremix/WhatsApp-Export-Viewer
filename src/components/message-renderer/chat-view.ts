import { ChatRow } from '../../types/index.js';

export class ChatView {
  private container: HTMLElement;
  private messages: ChatRow[] = [];

  constructor(container: HTMLElement) {
    this.container = container;
    this.render();
  }

  setMessages(messages: ChatRow[]) {
    this.messages = messages;
    this.render();
  }

  private render() {
    const messagesHtml = this.messages.map(message => this.createMessageHtml(message)).join('');
    
    this.container.innerHTML = `
      <div class="chat-container">
        ${messagesHtml}
      </div>
    `;
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

    const isOwnMessage = message.sender === 'You' || message.sender === 'Me';
    const messageClass = isOwnMessage ? 'own-message' : 'other-message';
    
    return `
      <div class="message-wrapper ${messageClass}">
        <div class="message-bubble">
          <div class="message-sender">
            ${this.escapeHtml(message.sender)}
          </div>
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
}
