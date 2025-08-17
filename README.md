# WhatsApp Export Viewer

A client-side web application for viewing WhatsApp chat exports in the browser. Built with Lit web components, TypeScript, SCSS, and Vite.

## Features

- **Drag & Drop Support**: Upload WhatsApp export ZIP files via drag-and-drop interface
- **Multi-format Parsing**: Supports various date formats and message types from WhatsApp exports
- **Media Display**: Extracts and displays images and documents inline from ZIP files
- **Responsive Chat Interface**: Clean, WhatsApp-like chat interface with proper message bubbles
- **Participant Management**: Select your own name to properly display message alignment
- **Demo Mode**: Test the application with built-in demo chat data
- **Client-side Only**: No server required - all processing happens in the browser
- **TypeScript**: Full type safety with comprehensive type definitions

## Tech Stack

- **Framework**: Lit (Web Components)
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: SCSS (compiled to CSS)
- **File Handling**: JSZip for ZIP file processing
- **State Management**: Custom service with reactive updates

## Project Structure

```
src/
├── components/          # Lit web components
│   ├── app/            # Main application component
│   ├── chat-viewer/    # Chat display and toolbar components
│   ├── onboarding/     # File upload and welcome screen
│   └── ui/             # Common UI components (toolbar)
├── styles/             # SCSS files
│   └── {components}/   # Component-specific styles
├── types/              # TypeScript type definitions
│   ├── index.ts        # Main type definitions
│   └── scss.d.ts       # SCSS module types
├── utils/              # Utility functions
│   ├── chat-model.ts   # Chat data models
│   ├── chat-parser.ts  # WhatsApp export parsing logic
│   └── chat-state-service.ts # Application state management
└── main.ts             # Application entry point
```

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
5. **Demo Mode**: Click "load demo chat" to test the application without uploading files

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

### Code Organization

The project follows a component-based architecture:

- **App Component**: Main application orchestrator and state management
- **Onboarding**: File upload interface with drag-and-drop support
- **Chat Viewer**: Message display with proper formatting and media support
- **Chat Parser**: WhatsApp export format parsing and ZIP file handling
- **State Service**: Centralized state management with reactive updates

### Key Features Implementation

- **File Processing**: Uses JSZip to extract and parse WhatsApp export ZIP files
- **Message Parsing**: Regex-based parsing of WhatsApp chat format with support for various date formats
- **Media Handling**: Extracts images and documents from ZIP files and displays them inline
- **Responsive Design**: SCSS-based styling with proper mobile and desktop layouts
- **Type Safety**: Comprehensive TypeScript types for all data structures

## Browser Support

- Chrome/Edge 86+
- Firefox 90+
- Safari 14+

## Deployment

The app can be deployed to any static hosting service:

- GitHub Pages
- Netlify
- Vercel
- AWS S3 + CloudFront

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Privacy

This application runs entirely in your browser. No chat data is sent to any server. All processing happens locally on your device.

## Support

For issues and feature requests, please use the [GitHub Issues](https://github.com/yourusername/WhatsApp-Export-Viewer/issues) page.