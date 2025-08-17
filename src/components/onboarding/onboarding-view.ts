import { LitElement, html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import styles from './onboarding-view.scss?inline';
import { chatStateService } from '../../utils/chat-state-service.js';
import '../ui/top-toolbar';

@customElement('onboarding-view')
export class OnboardingView extends LitElement {
  static styles = unsafeCSS(styles);

  private isDragOver = false;

  private handleDragOver(e: DragEvent): void {
    e.preventDefault();
    e.stopPropagation();
    this.isDragOver = true;
  }

  private handleDragLeave(e: DragEvent): void {
    e.preventDefault();
    e.stopPropagation();
    this.isDragOver = false;
  }

  private handleDrop(e: DragEvent): void {
    e.preventDefault();
    e.stopPropagation();
    this.isDragOver = false;

    const files = e.dataTransfer?.files;
    if (files && files.length > 0) {
      const file = files[0];
      chatStateService.processFile(file);
    }
  }

  render() {
    return html`
      <div class="onboarding-container">
        <top-toolbar title="WhatsApp Viewer"></top-toolbar>

        <main class="main-content">
          <h2 class="page-title">Get Started</h2>
          
          <div 
            class="upload-zone ${this.isDragOver ? 'drag-over' : ''}"
            @dragover=${this.handleDragOver}
            @dragleave=${this.handleDragLeave}
            @drop=${this.handleDrop}
          >
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
