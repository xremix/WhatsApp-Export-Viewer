// WhatsApp message types
export interface WhatsAppMessage {
  id: string;
  timestamp: Date;
  sender: string;
  content: string;
  type: MessageType;
  quotedMessage?: QuotedMessage;
  attachments: Attachment[];
  isSystemMessage: boolean;
}

export interface QuotedMessage {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
}

export interface Attachment {
  id: string;
  filename: string;
  type: AttachmentType;
  size: number;
  data?: Blob;
  url?: string;
}

export enum MessageType {
  TEXT = 'text',
  IMAGE = 'image',
  VIDEO = 'video',
  AUDIO = 'audio',
  DOCUMENT = 'document',
  STICKER = 'sticker',
  SYSTEM = 'system'
}

export enum AttachmentType {
  IMAGE = 'image',
  VIDEO = 'video',
  AUDIO = 'audio',
  DOCUMENT = 'document',
  STICKER = 'sticker'
}

// Application state
export interface AppState {
  messages: WhatsAppMessage[];
  isLoading: boolean;
  error: string | null;
  chatTitle: string;
  hasPersistedData: boolean;
}

// File handling
export interface FileHandle {
  id: string;
  name: string;
  handle?: FileSystemFileHandle;
  lastAccessed: Date;
}

// Chat model types
export interface ChatRow {
  id: string;
  timestamp: Date;
  sender: string;
  content: string;
  type: ChatRowType;
  metadata?: ChatRowMetadata;
}

export interface ChatRowMetadata {
  isSystemMessage: boolean;
  hasAttachment: boolean;
  attachmentType?: string;
  quotedMessage?: string;
  edited?: boolean;
  deleted?: boolean;
}

export enum ChatRowType {
  MESSAGE = 'message',
  SYSTEM = 'system',
  MEDIA = 'media',
  STATUS = 'status'
}

// Parser configuration
export interface ParserConfig {
  dateFormats: string[];
  timezone: string;
  locale: string;
}
