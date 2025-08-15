import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';


@customElement('whatsapp-viewer-app')
export class WhatsAppViewerApp extends LitElement {


  static styles = css`
    :host {
      display: block;
      height: 100vh;
      background-color: var(--color-background);
    }

    .app-container {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .header {
      background-color: var(--color-surface);
      border-bottom: 1px solid var(--color-border);
      padding: var(--spacing-md) var(--spacing-lg);
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: var(--header-height);
    }

    .header h1 {
      margin: 0;
      font-size: var(--font-size-xl);
      color: var(--color-text-primary);
    }

    .theme-toggle {
      background: none;
      border: 1px solid var(--color-border);
      border-radius: var(--border-radius-md);
      padding: var(--spacing-sm) var(--spacing-md);
      cursor: pointer;
      color: var(--color-text-primary);
      transition: all var(--transition-fast);
    }

    .theme-toggle:hover {
      background-color: var(--color-surface);
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
      padding: var(--spacing-xl);
    }

    .welcome h2 {
      margin: 0 0 var(--spacing-md) 0;
      font-size: var(--font-size-xxl);
      color: var(--color-text-primary);
    }

    .welcome p {
      margin: 0;
      font-size: var(--font-size-lg);
      color: var(--color-text-secondary);
    }
  `;

  constructor() {
    super();
    this.setupTheme();
  }

  private setupTheme(): void {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
  }

  private toggleTheme(): void {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  }



  render() {
    return html`
      <div class="app-container">
        <header class="header">
          <h1>WhatsApp Export Viewer</h1>
          <button 
            class="theme-toggle" 
            @click=${this.toggleTheme}
            aria-label="Toggle theme"
          >
            ${document.documentElement.getAttribute('data-theme') === 'dark' ? '☀️' : '🌙'}
          </button>
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
