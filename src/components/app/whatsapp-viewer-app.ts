import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '../onboarding/onboarding-view';
import { chatStateService } from '../../utils/chat-state-service.js';
import { AppState, ChatRow, MessageType } from '../../types/index.js';
import { ChatView } from '../message-renderer/index.js';
import '../ui/top-toolbar';
import { createDemoChat } from '../message-renderer/index.js';


@customElement('whatsapp-viewer-app')
export class WhatsAppViewerApp extends LitElement {

    static styles = css`
    :host {
      display: block;
      height: 100vh;
    }

    .chat-layout {
      display: flex;
      flex-direction: column;
      height: 100vh;
    }

    .chat-view-container {
      flex: 1;
      overflow-y: auto;
    }

    /* Chat styles */
    .chat-container {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 16px;
      background-color: #ffffff;
      min-height: 100vh;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    .message-wrapper {
      display: flex;
      margin-bottom: 4px;
    }

    .message-wrapper.own-message {
      justify-content: flex-end;
    }

    .message-wrapper.other-message {
      justify-content: flex-start;
    }

    .message-wrapper.system-message {
      justify-content: center;
      margin: 16px 0;
    }

    .message-bubble {
      max-width: 70%;
      padding: 8px 12px;
      border-radius: 8px;
      position: relative;
      word-wrap: break-word;
    }

    .own-message .message-bubble {
      background-color: #dcf8c6;
      color: #303030;
    }

    .other-message .message-bubble {
      background-color: #ffffff;
      color: #303030;
      border: 1px solid #e9e9e9;
    }

    .message-content {
      font-size: 14px;
      line-height: 1.4;
      margin-bottom: 4px;
    }

    .message-timestamp {
      font-size: 11px;
      color: #667781;
      text-align: right;
      margin-top: 2px;
    }

    .other-message .message-timestamp {
      text-align: left;
    }

    .system-message-content {
      background-color: #f0f0f0;
      color: #667781;
      padding: 8px 16px;
      border-radius: 12px;
      font-size: 12px;
      text-align: center;
      max-width: 80%;
    }
  `;

  private appState: AppState = chatStateService.getState();
  private chatView: ChatView | null = null;
  private unsubscribe: (() => void) | null = null;

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    this.unsubscribe = chatStateService.subscribe((state) => {
      this.appState = state;
      this.requestUpdate();
      
      // Update chat view if messages are available
      if (state.messages.length > 0 && this.chatView) {
        const chatRows: ChatRow[] = state.messages.map(msg => ({
          id: msg.id,
          timestamp: msg.timestamp,
          sender: msg.sender,
          content: msg.content,
          type: msg.type as any,
          metadata: {
            isSystemMessage: msg.isSystemMessage,
            hasAttachment: msg.attachments.length > 0
          }
        }));
        this.chatView.setMessages(chatRows);
      }
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

    render() {
    return html`
      ${this.appState.messages.length > 0 
        ? html`
          <div class="chat-layout">
            <top-toolbar 
              chatName="${this.appState.chatTitle || 'Family Chat'}"
              chatStatus="${this.appState.messages.length} messages"
              showBackButton
              showSearchButton
              showMenuButton
              @back-click=${this.handleBackClick}
              @search-click=${this.handleSearchClick}
              @menu-click=${this.handleMenuClick}
            ></top-toolbar>
            <div id="chat-container" class="chat-view-container"></div>
          </div>
        `
        : html`
          <div>
            <onboarding-view></onboarding-view>
            <button @click=${this.loadDemoData} style="position: fixed; top: 10px; right: 10px; z-index: 1000; padding: 10px; background: #25d366; color: white; border: none; border-radius: 5px; cursor: pointer;">
              Load Demo Chat
            </button>
          </div>
        `
      }
    `;
  }

  updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);
    
          // Initialize chat view when messages are available
      if (this.appState.messages.length > 0 && !this.chatView) {
        const chatContainer = this.shadowRoot?.getElementById('chat-container');
        if (chatContainer) {
          this.chatView = new ChatView(chatContainer, this.appState.ownName);
          
          // Convert messages to ChatRow format
          const chatRows: ChatRow[] = this.appState.messages.map(msg => ({
            id: msg.id,
            timestamp: msg.timestamp,
            sender: msg.sender,
            content: msg.content,
            type: msg.type as any,
            metadata: {
              isSystemMessage: msg.isSystemMessage,
              hasAttachment: msg.attachments.length > 0
            }
          }));
          
          this.chatView.setMessages(chatRows);
        }
      }
  }

  private handleBackClick() {
    // Clear the chat and go back to onboarding
    chatStateService.reset();
  }

  private handleSearchClick() {
    // TODO: Implement search functionality
    console.log('Search clicked');
  }

  private handleMenuClick() {
    // TODO: Implement menu functionality
    console.log('Menu clicked');
  }

  private loadDemoData() {
    // Load demo data to test the chat view and toolbar
    const demoMessages = [
      {
        id: '1',
        timestamp: new Date('2024-01-15T10:00:00'),
        sender: 'John',
        content: 'Hey everyone, what\'s for dinner?',
        type: MessageType.TEXT,
        quotedMessage: undefined,
        attachments: [],
        isSystemMessage: false
      },
      {
        id: '2',
        timestamp: new Date('2024-01-15T10:05:00'),
        sender: 'You',
        content: 'I\'m thinking pizza tonight!',
        type: MessageType.TEXT,
        quotedMessage: undefined,
        attachments: [],
        isSystemMessage: false
      },
      {
        id: '3',
        timestamp: new Date('2024-01-15T10:07:00'),
        sender: 'Sarah',
        content: 'Sounds good to me!',
        type: MessageType.TEXT,
        quotedMessage: undefined,
        attachments: [],
        isSystemMessage: false
      }
    ];
    
    chatStateService.setMessages(demoMessages);
    chatStateService.setChatTitle('Demo Chat');
    chatStateService.setOwnName('You');
  }
}
