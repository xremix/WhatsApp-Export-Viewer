import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('onboarding-view')
export class OnboardingView extends LitElement {
  static styles = css`
    :host {
      display: block;
      height: 100vh;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background-color: #ffffff;
      color: #111b21;
    }

    .onboarding-container {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .header {
      background-color: #25d366;
      padding: 1rem 1.5rem;
      display: flex;
      align-items: center;
      min-height: 4rem;
    }

    .header-icon {
      width: 24px;
      height: 24px;
      margin-right: 0.75rem;
      color: white;
    }

    .header-title {
      margin: 0;
      font-size: 1.125rem;
      color: white;
      font-weight: 600;
    }

    .main-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      text-align: center;
    }

    .page-title {
      margin: 0 0 2rem 0;
      font-size: 2rem;
      font-weight: 700;
      color: #111b21;
    }

    .upload-zone {
      width: 100%;
      max-width: 500px;
      height: 200px;
      border: 2px dashed #d1d5db;
      border-radius: 0.75rem;
      background-color: #f9fafb;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-bottom: 1.5rem;
      transition: all 0.2s ease-in-out;
    }

    .upload-zone:hover {
      border-color: #25d366;
      background-color: #f0fdf4;
    }

    .upload-icon {
      width: 48px;
      height: 48px;
      margin-bottom: 1rem;
      color: #9ca3af;
    }

    .upload-text {
      color: #6b7280;
      font-size: 1rem;
      margin: 0;
    }

    .info-link {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #6b7280;
      font-size: 0.875rem;
      text-decoration: none;
      margin-bottom: 2rem;
    }

    .info-icon {
      width: 16px;
      height: 16px;
      margin-right: 0.5rem;
      border-radius: 50%;
      background-color: #6b7280;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.75rem;
      font-weight: bold;
    }

    .scroll-indicator {
      position: absolute;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      align-items: center;
      color: #6b7280;
      font-size: 0.875rem;
    }

    .scroll-icon {
      width: 16px;
      height: 16px;
      margin-right: 0.5rem;
    }
  `;

  render() {
    return html`
      <div class="onboarding-container">
        <header class="header">
          <svg class="header-icon" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
          </svg>
          <h1 class="header-title">Get Started</h1>
        </header>

        <main class="main-content">
          <h2 class="page-title">Get Started</h2>
          
          <div class="upload-zone">
            <svg class="upload-icon" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"/>
              <path d="M10 9v3m0 0v3m0-3h3m-3 0H7"/>
            </svg>
            <p class="upload-text">Drag and drop your WhatsApp export folder or zip file here</p>
          </div>

          <a href="#" class="info-link">
            <div class="info-icon">i</div>
            Learn how to export your WhatsApp chats
          </a>
        </main>

        <div class="scroll-indicator">
          <svg class="scroll-icon" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
          </svg>
          Scroll to learn more
        </div>
      </div>
    `;
  }
}
