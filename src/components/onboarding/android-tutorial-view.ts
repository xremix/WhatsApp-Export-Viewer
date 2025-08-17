import { LitElement, html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import styles from './tutorial-view.scss?inline';

@customElement('android-tutorial-view')
export class AndroidTutorialView extends LitElement {
  static styles = unsafeCSS(styles);

  render() {
    return html`
      <div class="tutorial-content">
        <h3 class="content-title">How to Export WhatsApp Chats on Android</h3>
        
        <div class="tutorial-section">
          <h4 class="section-title">Prerequisites</h4>
          <p class="tutorial-text">
            Before you start, make sure you have:
          </p>
          <ul class="tutorial-list">
            <li>WhatsApp installed and updated on your Android device</li>
            <li>Access to the chat you want to export</li>
            <li>Sufficient storage space (especially if including media)</li>
            <li>Your Android device connected to a computer (optional, for easier file access)</li>
          </ul>
        </div>

        <div class="tutorial-section">
          <h4 class="section-title">Step-by-Step Instructions</h4>
          
          <div class="step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h5 class="step-title">Open WhatsApp</h5>
              <p class="tutorial-text">
                Launch the WhatsApp app on your Android device and navigate to the chat you want to export.
              </p>
            </div>
          </div>

          <div class="step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h5 class="step-title">Access Chat Menu</h5>
              <p class="tutorial-text">
                Tap the three-dot menu (⋮) in the top-right corner of the chat screen to open the chat options menu.
              </p>
            </div>
          </div>

          <div class="step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h5 class="step-title">Select More Options</h5>
              <p class="tutorial-text">
                From the menu, tap "More" to see additional options, then select "Export chat".
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
                Select your preferred option based on your needs and available storage.
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
                <li>Share it via email, WhatsApp, or other messaging apps</li>
                <li>Save it to Google Drive, Dropbox, or other cloud storage</li>
                <li>Transfer it to your computer via USB or cloud storage</li>
                <li>Save it directly to your device's internal storage</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="tutorial-section">
          <h4 class="section-title">Important Notes</h4>
          <div class="note-box">
            <p class="tutorial-text">
              <strong>File Location:</strong> On Android, exported files are typically saved in the WhatsApp folder in your device's internal storage or SD card.
            </p>
            <p class="tutorial-text">
              <strong>File Format:</strong> WhatsApp exports are saved as plain text (.txt) files, which can be easily opened and viewed on any device.
            </p>
            <p class="tutorial-text">
              <strong>File Size:</strong> Exports with media can be very large. Consider using "Without Media" if you only need the text messages or have limited storage.
            </p>
            <p class="tutorial-text">
              <strong>Privacy:</strong> The exported file contains all messages from the chat, so handle it securely and don't share it with unauthorized people.
            </p>
          </div>
        </div>

        <div class="tutorial-section">
          <h4 class="section-title">Android-Specific Tips</h4>
          <div class="note-box">
            <p class="tutorial-text">
              <strong>File Manager:</strong> Use your device's file manager app to locate exported files in the WhatsApp folder.
            </p>
            <p class="tutorial-text">
              <strong>SD Card:</strong> If you have an SD card, exported files might be saved there instead of internal storage.
            </p>
            <p class="tutorial-text">
              <strong>Cloud Backup:</strong> Consider using Google Drive or other cloud services for easy access to your exported chats across devices.
            </p>
          </div>
        </div>

        <div class="tutorial-section">
          <h4 class="section-title">Troubleshooting</h4>
          <div class="troubleshooting">
            <p class="tutorial-text">
              <strong>Can't find the three-dot menu?</strong> Make sure you're in the chat screen, not the main WhatsApp screen. The menu appears in the top-right corner of individual chats.
            </p>
            <p class="tutorial-text">
              <strong>Export option not available?</strong> Make sure you have the latest version of WhatsApp installed and that you have sufficient storage space.
            </p>
            <p class="tutorial-text">
              <strong>Export taking too long?</strong> Large chats with media can take several minutes to export. Be patient and don't close WhatsApp or switch to other apps.
            </p>
            <p class="tutorial-text">
              <strong>File too large to share?</strong> Try exporting without media, or use cloud storage services like Google Drive to share large files.
            </p>
            <p class="tutorial-text">
              <strong>Can't find exported file?</strong> Check your device's file manager in the WhatsApp folder, or use the search function to look for .txt files.
            </p>
          </div>
        </div>
      </div>
    `;
  }
}
