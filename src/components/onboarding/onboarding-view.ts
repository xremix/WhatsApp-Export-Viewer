import { LitElement, html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import styles from './onboarding-view.scss?inline';
import { chatStateService } from '../../utils/chat-state-service.js';
import '../ui/top-toolbar';
import './features-view';
import './tutorial-view';

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

  private handleDemoClick(e: Event): void {
    e.preventDefault();
    this.dispatchEvent(new CustomEvent('load-demo'));
  }

  render() {
    return html`
      <div class="onboarding-container">
        <top-toolbar title="WhatsApp Viewer"></top-toolbar>

        <section class="hero-section">
          <div class="hero-content">
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
            
            <a href="#" class="demo-link" @click=${this.handleDemoClick}>
              <svg class="demo-icon" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
              </svg>
              load demo chat
            </a>
          </div>

          <div class="scroll-indicator">
            <svg class="scroll-icon" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
            Scroll to learn how to export your WhatsApp Chats
          </div>
        </section>

        <section class="features-section">
          <features-view></features-view>
        </section>

        <section class="tutorial-section">
          <tutorial-view></tutorial-view>
        </section>
      </div>
    `;
  }
}
