import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';


@customElement('whatsapp-viewer-app')
export class WhatsAppViewerApp extends LitElement {


  static styles = css`
    :host {
      display: block;
      height: 100vh;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background-color: #ffffff;
      color: #111b21;
    }

    .app-container {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .header {
      background-color: #f0f2f5;
      border-bottom: 1px solid #e9edef;
      padding: 1rem 1.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 4rem;
    }

    .header h1 {
      margin: 0;
      font-size: 1.25rem;
      color: #111b21;
    }

    .theme-toggle {
      background: none;
      border: 1px solid #e9edef;
      border-radius: 0.5rem;
      padding: 0.5rem 1rem;
      cursor: pointer;
      color: #111b21;
      transition: all 0.15s ease-in-out;
    }

    .theme-toggle:hover {
      background-color: #e9edef;
    }

    .main-content {
      flex: 1;
      display: flex;
      overflow: hidden;
    }

    .welcome {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      text-align: center;
      padding: 2rem;
    }

    .welcome h2 {
      margin: 0 0 1rem 0;
      font-size: 1.5rem;
      color: #111b21;
    }

    .welcome p {
      margin: 0;
      font-size: 1.125rem;
      color: #667781;
    }


  `;

  constructor() {
    super();
  }





  render() {
    return html`
      <div class="app-container">
        <header class="header">
          <h1>WhatsApp Export Viewer</h1>
      
        </header>

        <main class="main-content">
          <div class="welcome">
            <h2>WhatsApp Export Viewer</h2>
            <p>Upload your WhatsApp export ZIP file to get started.</p>
          </div>
        </main>
      </div>
    `;
  }
}
