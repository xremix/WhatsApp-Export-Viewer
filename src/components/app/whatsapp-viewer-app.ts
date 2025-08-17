import { LitElement, html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import '../onboarding/onboarding-view';
import { chatStateService } from '../../utils/chat-state-service.js';
import { AppState, ChatRow, MessageType } from '../../types/index.js';
import { ChatView } from '../chat-viewer/index.js';
import '../ui/top-toolbar';
import '../chat-viewer/chat-toolbar.js';
import styles from './whatsapp-viewer-app.scss?inline';


@customElement('whatsapp-viewer-app')
export class WhatsAppViewerApp extends LitElement {

    static styles = unsafeCSS(styles);

  private appState: AppState = chatStateService.getState();
  private chatView: ChatView | null = null;
  private unsubscribe: (() => void) | null = null;

  // Get unique participants from messages
  private getUniqueParticipants(): string[] {
    const participants = [...new Set(this.appState.messages.map(msg => msg.sender))]
      .filter(name => name.trim() !== '' && !name.includes('System'))
      .sort();
    
    // Set default own name if none is selected and we have participants
    if (!this.appState.ownName && participants.length > 0) {
      chatStateService.setOwnName(participants[0]);
    }
    
    return participants;
  }

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
        const chatRows: ChatRow[] = state.messages.map(msg => {
          const metadata: any = {
            isSystemMessage: msg.isSystemMessage,
            hasAttachment: msg.attachments.length > 0
          };
          
          // Preserve attachment data if present
          if (msg.attachments.length > 0) {
            const attachment = msg.attachments[0]; // For now, handle first attachment
            metadata.attachmentType = attachment.type;
            metadata.attachmentFilename = attachment.filename;
            metadata.attachmentData = attachment.url;
            metadata.attachmentSize = attachment.size;
          }
          
          return {
            id: msg.id,
            timestamp: msg.timestamp,
            sender: msg.sender,
            content: msg.content,
            type: msg.type as any,
            metadata
          };
        });
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
            <chat-toolbar
              id="chat-toolbar"
              @own-name-change=${this.handleOwnNameChange}
              @search-change=${this.handleSearchChange}
              @search-next=${this.handleSearchNext}
              @search-previous=${this.handleSearchPrevious}
            ></chat-toolbar>
            <div id="chat-container" class="chat-view-container"></div>
          </div>
        `
        : html`
          <div>
            <onboarding-view @load-demo=${this.loadDemoData}></onboarding-view>
          </div>
        `
      }
    `;
  }

  updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);
    
    // Update chat toolbar with current data
    const chatToolbar = this.shadowRoot?.getElementById('chat-toolbar') as any;
    if (chatToolbar) {
      chatToolbar.setParticipants(this.getUniqueParticipants());
      chatToolbar.setSelectedOwnName(this.appState.ownName);
    }
    
    // Initialize chat view when messages are available
    if (this.appState.messages.length > 0 && !this.chatView) {
      const chatContainer = this.shadowRoot?.getElementById('chat-container');
      if (chatContainer) {
        this.chatView = new ChatView(chatContainer, this.appState.ownName);
        
        // Convert messages to ChatRow format
        const chatRows: ChatRow[] = this.appState.messages.map(msg => {
          const metadata: any = {
            isSystemMessage: msg.isSystemMessage,
            hasAttachment: msg.attachments.length > 0
          };
          
          // Preserve attachment data if present
          if (msg.attachments.length > 0) {
            const attachment = msg.attachments[0]; // For now, handle first attachment
            metadata.attachmentType = attachment.type;
            metadata.attachmentFilename = attachment.filename;
            metadata.attachmentData = attachment.url;
            metadata.attachmentSize = attachment.size;
          }
          
          return {
            id: msg.id,
            timestamp: msg.timestamp,
            sender: msg.sender,
            content: msg.content,
            type: msg.type as any,
            metadata
          };
        });
        
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

  private handleOwnNameChange(event: CustomEvent) {
    const { ownName } = event.detail;
    chatStateService.setOwnName(ownName);
    
    // Update the chat view with the new own name
    if (this.chatView) {
      this.chatView.updateOwnName(ownName);
    }
  }

  private handleSearchChange(event: CustomEvent) {
    const { searchTerm } = event.detail;
    
    if (this.chatView) {
      const resultCount = this.chatView.searchMessages(searchTerm);
      console.log(`Found ${resultCount} messages containing "${searchTerm}"`);
      
      // Update toolbar with search results
      const chatToolbar = this.shadowRoot?.getElementById('chat-toolbar') as any;
      if (chatToolbar) {
        chatToolbar.updateSearchResults(resultCount, -1);
      }
    }
  }

  private handleSearchNext(event: CustomEvent) {
    const { searchTerm } = event.detail;
    
    if (this.chatView) {
      if (searchTerm.trim()) {
        // Perform the search (this won't reset index if term hasn't changed)
        const resultCount = this.chatView.searchMessages(searchTerm);
        // Then move to next result
        const found = this.chatView.searchNext();
        if (!found) {
          console.log('No search results found');
        }
        
        // Update toolbar with current search position
        const chatToolbar = this.shadowRoot?.getElementById('chat-toolbar') as any;
        if (chatToolbar) {
          const currentIndex = this.chatView.getCurrentSearchIndex();
          chatToolbar.updateSearchResults(resultCount, currentIndex);
        }
      }
    }
  }

  private handleSearchPrevious(event: CustomEvent) {
    const { searchTerm } = event.detail;

    if (this.chatView) {
      if (searchTerm.trim()) {
        // Perform the search (this won't reset index if term hasn't changed)
        const resultCount = this.chatView.searchMessages(searchTerm);
        // Then move to previous result
        const found = this.chatView.searchPrevious();
        if (!found) {
          console.log('No search results found');
        }
        
        // Update toolbar with current search position
        const chatToolbar = this.shadowRoot?.getElementById('chat-toolbar') as any;
        if (chatToolbar) {
          const currentIndex = this.chatView.getCurrentSearchIndex();
          chatToolbar.updateSearchResults(resultCount, currentIndex);
        }
      }
    }
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
        content: 'Sounds good to me! Pizza is always a great choice.',
        type: MessageType.TEXT,
        quotedMessage: undefined,
        attachments: [],
        isSystemMessage: false
      },
      {
        id: '4',
        timestamp: new Date('2024-01-15T10:10:00'),
        sender: 'John',
        content: 'What kind of pizza should we get? I like pepperoni.',
        type: MessageType.TEXT,
        quotedMessage: undefined,
        attachments: [],
        isSystemMessage: false
      },
      {
        id: '5',
        timestamp: new Date('2024-01-15T10:12:00'),
        sender: 'You',
        content: 'Pepperoni sounds perfect! Should we order from Pizza Palace?',
        type: MessageType.TEXT,
        quotedMessage: undefined,
        attachments: [],
        isSystemMessage: false
      },
      {
        id: '6',
        timestamp: new Date('2024-01-15T10:15:00'),
        sender: 'Sarah',
        content: 'Yes, Pizza Palace has the best pepperoni pizza in town!',
        type: MessageType.TEXT,
        quotedMessage: undefined,
        attachments: [],
        isSystemMessage: false
      },
      {
        id: '7',
        timestamp: new Date('2024-01-15T10:20:00'),
        sender: 'John',
        content: 'Great! I\'ll call them now. Should we get a large pizza?',
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
