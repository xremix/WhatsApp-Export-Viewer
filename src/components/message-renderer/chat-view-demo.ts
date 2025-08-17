import { ChatView } from './chat-view.js';
import { ChatRow, ChatRowType } from '../../types/index.js';

// Demo function to test the chat view
export function createDemoChat(container: HTMLElement) {
  const demoMessages: ChatRow[] = [
    {
      id: '1',
      timestamp: new Date('2024-01-15T10:00:00'),
      sender: 'John',
      content: 'Hey everyone, what\'s for dinner?',
      type: ChatRowType.MESSAGE,
      metadata: { isSystemMessage: false, hasAttachment: false }
    },
    {
      id: '2',
      timestamp: new Date('2024-01-15T10:05:00'),
      sender: 'You',
      content: 'I\'m thinking pizza tonight!',
      type: ChatRowType.MESSAGE,
      metadata: { isSystemMessage: false, hasAttachment: false }
    },
    {
      id: '3',
      timestamp: new Date('2024-01-15T10:07:00'),
      sender: 'Sarah',
      content: 'Sounds good to me!',
      type: ChatRowType.MESSAGE,
      metadata: { isSystemMessage: false, hasAttachment: false }
    },
    {
      id: '4',
      timestamp: new Date('2024-01-15T10:10:00'),
      sender: 'You',
      content: 'Great, I\'ll order it soon.',
      type: ChatRowType.MESSAGE,
      metadata: { isSystemMessage: false, hasAttachment: false }
    },
    {
      id: '5',
      timestamp: new Date('2024-01-15T10:12:00'),
      sender: 'Mike',
      content: 'Don\'t forget the garlic knots!',
      type: ChatRowType.MESSAGE,
      metadata: { isSystemMessage: false, hasAttachment: false }
    }
  ];

  const chatView = new ChatView(container);
  chatView.setMessages(demoMessages);
  
  return chatView;
}
