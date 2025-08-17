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
    this.container.innerHTML = '';
    
    // Create chat container
    const chatContainer = document.createElement('div');
    chatContainer.className = 'chat-container';
    
    // Add messages
    this.messages.forEach(message => {
      const messageElement = this.createMessageElement(message);
      chatContainer.appendChild(messageElement);
    });
    
    this.container.appendChild(chatContainer);
  }

  private createMessageElement(message: ChatRow): HTMLElement {
    const messageWrapper = document.createElement('div');
    messageWrapper.className = 'message-wrapper';
    
    // Determine if this is a system message or regular message
    if (message.metadata?.isSystemMessage) {
      messageWrapper.className += ' system-message';
      const systemElement = document.createElement('div');
      systemElement.className = 'system-message-content';
      systemElement.textContent = message.content;
      messageWrapper.appendChild(systemElement);
    } else {
      // Regular message
      const isOwnMessage = message.sender === 'You' || message.sender === 'Me';
      messageWrapper.className += isOwnMessage ? ' own-message' : ' other-message';
      
      const messageBubble = document.createElement('div');
      messageBubble.className = 'message-bubble';
      
      // Message content
      const contentElement = document.createElement('div');
      contentElement.className = 'message-content';
      contentElement.textContent = message.content;
      messageBubble.appendChild(contentElement);
      
      // Timestamp
      const timestampElement = document.createElement('div');
      timestampElement.className = 'message-timestamp';
      timestampElement.textContent = this.formatTime(message.timestamp);
      messageBubble.appendChild(timestampElement);
      
      messageWrapper.appendChild(messageBubble);
    }
    
    return messageWrapper;
  }

  private formatTime(date: Date): string {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    const displayMinutes = minutes.toString().padStart(2, '0');
    return `${displayHours}:${displayMinutes} ${ampm}`;
  }
}
