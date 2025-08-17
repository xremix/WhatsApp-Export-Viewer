import { LitElement, html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import styles from './tutorial-view.scss?inline';

@customElement('tutorial-view')
export class TutorialView extends LitElement {
  static styles = unsafeCSS(styles);

  render() {
    return html`
      <div class="tutorial-container">
        <main class="main-content">
          <h2 class="page-title">Tutorial</h2>
          
          <div class="tutorial-content">
            <p class="tutorial-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            
            <p class="tutorial-text">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </main>
      </div>
    `;
  }
}
