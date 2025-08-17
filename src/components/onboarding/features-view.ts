import { LitElement, html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import styles from './features-view.scss?inline';

@customElement('features-view')
export class FeaturesView extends LitElement {
  static styles = unsafeCSS(styles);

  render() {
    return html`
      <div class="features-container">
        <main class="main-content">
          <h2 class="page-title">Features</h2>
          
          <div class="features-content">
            <p class="features-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            
            <p class="features-text">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </main>
      </div>
    `;
  }
}
