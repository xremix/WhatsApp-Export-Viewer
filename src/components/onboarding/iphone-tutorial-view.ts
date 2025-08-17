import { LitElement, html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import styles from './tutorial-view.scss?inline';

@customElement('iphone-tutorial-view')
export class IphoneTutorialView extends LitElement {
  static styles = unsafeCSS(styles);

  render() {
    return html`
      <div class="tutorial-content">
        <h3 class="content-title">How to Export WhatsApp Chats on iPhone</h3>
        
        <div class="tutorial-section">
          <h4 class="section-title">Prerequisites</h4>
          <p class="tutorial-text">
            Before you start, make sure you have:
          </p>
          <ul class="tutorial-list">
            <li>WhatsApp installed and updated on your iPhone</li>
            <li>Access to the chat you want to export</li>
            <li>Your iPhone connected to a computer (optional, for easier file access)</li>
          </ul>
        </div>

        <div class="tutorial-section">
          <h4 class="section-title">Step-by-Step Instructions</h4>
          
          <div class="step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h5 class="step-title">Open WhatsApp</h5>
              <p class="tutorial-text">
                Launch the WhatsApp app on your iPhone and navigate to the chat you want to export.
              </p>
            </div>
          </div>

          <div class="step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h5 class="step-title">Access Chat Info</h5>
              <p class="tutorial-text">
                Tap on the chat name at the top of the screen to open the chat info page.
              </p>
            </div>
          </div>

          <div class="step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h5 class="step-title">Find Export Chat Option</h5>
              <p class="tutorial-text">
                Scroll down and look for "Export Chat" option. Tap on it to proceed.
              </p>
            </div>
          </div>

          <div class="step">
            <div class="step-number">4</div>
            <div class="step-content">
              <h5 class="step-title">Choose Export Format</h5>
              <p class="tutorial-text">
                You'll see two options:
              </p>
              <ul class="tutorial-list">
                <li><strong>Without Media:</strong> Exports only text messages (smaller file size)</li>
                <li><strong>Include Media:</strong> Exports text messages plus photos, videos, and documents (larger file size)</li>
              </ul>
              <p class="tutorial-text">
                Select your preferred option based on your needs.
              </p>
            </div>
          </div>

          <div class="step">
            <div class="step-number">5</div>
            <div class="step-content">
              <h5 class="step-title">Share the Export</h5>
              <p class="tutorial-text">
                WhatsApp will generate a .txt file with your chat history. You can then:
              </p>
              <ul class="tutorial-list">
                <li>Share it via email, AirDrop, or other apps</li>
                <li>Save it to Files app for later access</li>
                <li>Send it to your computer via iCloud Drive</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="tutorial-section">
          <h4 class="section-title">Important Notes</h4>
          <div class="note-box">
            <p class="tutorial-text">
              <strong>File Format:</strong> WhatsApp exports are saved as plain text (.txt) files, which can be easily opened and viewed on any device.
            </p>
            <p class="tutorial-text">
              <strong>File Size:</strong> Exports with media can be quite large. Consider using "Without Media" if you only need the text messages.
            </p>
            <p class="tutorial-text">
              <strong>Privacy:</strong> The exported file contains all messages from the chat, so handle it securely and don't share it with unauthorized people.
            </p>
          </div>
        </div>

        <div class="tutorial-section">
          <h4 class="section-title">Troubleshooting</h4>
          <div class="troubleshooting">
            <p class="tutorial-text">
              <strong>Can't find Export Chat?</strong> Make sure you're in the chat info page (tap the chat name at the top), not the main chat screen.
            </p>
            <p class="tutorial-text">
              <strong>Export taking too long?</strong> Large chats with media can take several minutes to export. Be patient and don't close WhatsApp.
            </p>
            <p class="tutorial-text">
              <strong>File too large to share?</strong> Try exporting without media, or use iCloud Drive to transfer the file to your computer.
            </p>
          </div>
        </div>
      </div>
    `;
  }
}
