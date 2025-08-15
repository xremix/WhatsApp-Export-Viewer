# WhatsApp Export Viewer

A client-side web application for viewing WhatsApp chat exports in the browser. Built with Lit web components, SCSS, and Vite.

## Features

- **Drag & Drop Support**: Upload WhatsApp export ZIP files via drag-and-drop or file input
- **Multi-format Parsing**: Supports various date formats, multi-line messages, quoted messages, and system messages
- **Media Display**: Extracts and displays images, videos, audio, stickers, and documents inline
- **Virtualized Rendering**: Uses lit-virtualizer for smooth scrolling with large chat histories
- **File System Access**: Persists folder/ZIP handles using the File System Access API and IndexedDB
- **Responsive Design**: Works on desktop and mobile with light/dark theme support
- **Client-side Only**: No server required - deploy as static files

## Tech Stack

- **Framework**: Lit (Web Components)
- **Build Tool**: Vite
- **Styling**: SCSS (compiled to CSS)
- **Virtualization**: lit-virtualizer
- **File Handling**: JSZip, File System Access API
- **Storage**: IndexedDB

## Project Structure

```
src/
├── components/          # Lit web components
│   ├── file-import/     # File upload and ZIP handling
│   ├── chat-parser/     # WhatsApp export parsing
│   ├── message-renderer/ # Message display components
│   └── ui/             # Common UI components
├── styles/             # SCSS files
│   ├── variables.scss  # Theme variables
│   ├── components/     # Component-specific styles
│   └── main.scss       # Main stylesheet
├── utils/              # Utility functions
│   ├── parser.ts       # Message parsing logic
│   ├── storage.ts      # IndexedDB operations
│   └── media.ts        # Media handling utilities
└── types/              # TypeScript type definitions
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
2. **Upload to Viewer**: Drag the ZIP file onto the app or use the file picker
3. **View Chat**: The chat will load with all messages and media displayed
4. **Persistent Access**: The app will remember your chat for future visits (if supported by browser)

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

### Code Organization

The project follows a vertical slice architecture:

- **File Import**: Handles ZIP upload, extraction, and File System Access API
- **Parsing**: Processes WhatsApp export format and extracts message data
- **Rendering**: Displays messages with virtualization for performance
- **Styling**: SCSS-based theming with CSS custom properties
- **State Management**: Component state and IndexedDB persistence

## Browser Support

- Chrome/Edge 86+ (File System Access API support)
- Firefox 90+ (limited File System Access API)
- Safari 14+ (no File System Access API)

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