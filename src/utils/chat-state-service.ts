import { AppState, WhatsAppMessage } from '../types/index.js';
import { ChatParser } from './chat-parser.js';

class ChatStateService {
  private state: AppState = {
    messages: [],
    isLoading: false,
    error: null,
    chatTitle: '',
    hasPersistedData: false
  };

  private listeners: Set<(state: AppState) => void> = new Set();

  // Get current state
  getState(): AppState {
    return { ...this.state };
  }

  // Subscribe to state changes
  subscribe(listener: (state: AppState) => void): () => void {
    this.listeners.add(listener);
    // Return unsubscribe function
    return () => {
      this.listeners.delete(listener);
    };
  }

  // Notify all listeners of state change
  private notifyListeners(): void {
    const currentState = this.getState();
    this.listeners.forEach(listener => listener(currentState));
  }

  // Update state
  private updateState(updates: Partial<AppState>): void {
    this.state = { ...this.state, ...updates };
    this.notifyListeners();
  }

  // Action: Set loading state
  setLoading(isLoading: boolean): void {
    this.updateState({ isLoading, error: isLoading ? null : this.state.error });
  }

  // Action: Set error
  setError(error: string | null): void {
    this.updateState({ error, isLoading: false });
  }

  // Action: Set messages
  setMessages(messages: WhatsAppMessage[]): void {
    this.updateState({ messages, isLoading: false, error: null });
  }

  // Action: Add message
  addMessage(message: WhatsAppMessage): void {
    const messages = [...this.state.messages, message];
    this.updateState({ messages });
  }

  // Action: Add multiple messages
  addMessages(newMessages: WhatsAppMessage[]): void {
    const messages = [...this.state.messages, ...newMessages];
    this.updateState({ messages });
  }

  // Action: Clear messages
  clearMessages(): void {
    this.updateState({ messages: [], chatTitle: '', hasPersistedData: false });
  }

  // Action: Set chat title
  setChatTitle(title: string): void {
    this.updateState({ chatTitle: title });
  }

  // Action: Reset state
  reset(): void {
    this.updateState({
      messages: [],
      isLoading: false,
      error: null,
      chatTitle: '',
      hasPersistedData: false
    });
  }

  // Get messages count
  getMessagesCount(): number {
    return this.state.messages.length;
  }

  // Get messages by sender
  getMessagesBySender(sender: string): WhatsAppMessage[] {
    return this.state.messages.filter(message => message.sender === sender);
  }

  // Get messages in date range
  getMessagesInDateRange(startDate: Date, endDate: Date): WhatsAppMessage[] {
    return this.state.messages.filter(message => 
      message.timestamp >= startDate && message.timestamp <= endDate
    );
  }

  // Check if state has data
  hasData(): boolean {
    return this.state.messages.length > 0;
  }

  // Check if currently loading
  isLoading(): boolean {
    return this.state.isLoading;
  }

  // Check if there's an error
  hasError(): boolean {
    return this.state.error !== null;
  }

  // Action: Process uploaded file
  async processFile(file: File): Promise<void> {
    try {
      this.setLoading(true);
      this.setError(null);
      
      // Validate file type
      if (!file.name.endsWith('.zip')) {
        throw new Error('Please upload a ZIP file containing your WhatsApp export');
      }

      // Use the chat parser to process the ZIP file
      const chatRows = await ChatParser.parseZipFile(file);
      
      // Set chat title based on the file name
      this.setChatTitle(file.name.replace('.zip', ''));
      
      // Convert ChatRow objects to WhatsAppMessage objects for now
      // TODO: Update AppState to use ChatRow instead of WhatsAppMessage
      const messages = chatRows.map(row => ({
        id: row.id,
        timestamp: row.timestamp,
        sender: row.sender,
        content: row.content,
        type: 'text' as any, // TODO: map ChatRowType to MessageType
        quotedMessage: undefined,
        attachments: [],
        isSystemMessage: row.metadata?.isSystemMessage || false
      }));
      
      this.setMessages(messages);
      
    } catch (error) {
      this.setError(error instanceof Error ? error.message : 'Failed to process file');
    } finally {
      this.setLoading(false);
    }
  }
}

// Export singleton instance
export const chatStateService = new ChatStateService();
