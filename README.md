# WhatsApp Export Viewer

A client-side web application for viewing WhatsApp chat exports in the browser. Built with Lit web components, TypeScript, SCSS, and Vite.

## Features

- **Drag & Drop Support**: Upload WhatsApp export ZIP files via drag-and-drop interface
- **Multi-format Parsing**: Supports various date formats and message types from WhatsApp exports
- **Media Display**: Extracts and displays images and documents inline from ZIP files
- **Responsive Chat Interface**: Clean, WhatsApp-like chat interface with proper message bubbles
- **Participant Management**: Select your own name to properly display message alignment
- **Search Functionality**: Search through messages with next/previous navigation
- **Demo Mode**: Test the application with built-in demo chat data
- **Client-side Only**: No server required - all processing happens in the browser
- **TypeScript**: Full type safety with comprehensive type definitions
- **Tutorial Support**: Built-in tutorials for Android and iPhone export processes

## Tech Stack

- **Framework**: Lit (Web Components)
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: SCSS (compiled to CSS)
- **File Handling**: JSZip for ZIP file processing
- **Virtual Scrolling**: lit-virtualizer for performance
- **State Management**: Custom service with reactive updates

## Project Structure

The project follows a **vertical slice architecture** pattern, where each feature is self-contained with its own components, styles, and logic. This approach promotes maintainability and reduces coupling between different parts of the application.

```
src/
├── components/          # Lit web components organized by feature
│   ├── app/            # Main application orchestrator
│   ├── chat-viewer/    # Chat display and interaction features
│   ├── onboarding/     # File upload and tutorial features
│   └── ui/             # Shared UI components
├── types/              # TypeScript type definitions
├── utils/              # Core business logic and services
└── main.ts             # Application entry point
```

### Architecture Principles

- **Vertical Slices**: Each feature (chat-viewer, onboarding) contains all related components, styles, and logic
- **Feature Isolation**: Features are self-contained and can be developed independently
- **Shared Components**: Common UI elements are extracted to the `ui/` directory
- **Type Safety**: Centralized type definitions ensure consistency across features
- **State Management**: Centralized state service with reactive updates

### Feature Organization

- **App Layer**: Orchestrates the overall application flow and manages global state
- **Feature Layers**: Each feature (chat-viewer, onboarding) contains its complete implementation
- **Shared Layer**: Common utilities, types, and UI components used across features

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/WhatsApp-Export-Viewer.git
cd WhatsApp-Export-Viewer

# Install dependencies
npm install

# Start development server
npm run dev
```

### Building for Production

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Usage

1. **Export from WhatsApp**: In WhatsApp, go to Settings > Chats > Chat history > Export chat
2. **Upload to Viewer**: Drag the ZIP file onto the upload zone or use the file picker
3. **Set Your Name**: Select your name from the participant list to properly align messages
4. **View Chat**: The chat will load with all messages and media displayed in a WhatsApp-like interface
5. **Search Messages**: Use the search functionality to find specific messages
6. **Demo Mode**: Click "load demo chat" to test the application without uploading files

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

### Code Organization

The project follows a component-based architecture:

- **App Component** (`whatsapp-viewer-app.ts`): Main application orchestrator and state management
- **Onboarding** (`onboarding-view.ts`): File upload interface with drag-and-drop support
- **Chat Viewer** (`chat-view.ts`): Message display with proper formatting, media support, and search functionality
- **Chat Parser** (`chat-parser.ts`): WhatsApp export format parsing and ZIP file handling
- **State Service** (`chat-state-service.ts`): Centralized state management with reactive updates

### Key Features Implementation

- **File Processing**: Uses JSZip to extract and parse WhatsApp export ZIP files
- **Message Parsing**: Regex-based parsing of WhatsApp chat format with support for various date formats
- **Media Handling**: Extracts images and documents from ZIP files and displays them inline
- **Search System**: Full-text search with result highlighting and navigation
- **Responsive Design**: SCSS-based styling with proper mobile and desktop layouts
- **Type Safety**: Comprehensive TypeScript types for all data structures
- **Tutorial System**: Built-in guides for Android and iPhone export processes

### Component Architecture

- **Main App**: Orchestrates the overall application flow and manages state
- **Onboarding**: Handles file uploads with drag-and-drop and tutorial access
- **Chat Viewer**: Renders messages with proper alignment, media display, and search
- **Chat Toolbar**: Provides participant selection and chat controls
- **Top Toolbar**: Navigation and search interface
- **Tutorial Views**: Step-by-step guides for different export methods

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Privacy

This application runs entirely in your browser. No chat data is sent to any server. All processing happens locally on your device.

## Support

For issues and feature requests, please use the [GitHub Issues](https://github.com/yourusername/WhatsApp-Export-Viewer/issues) page.