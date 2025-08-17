import { LitElement, html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import styles from './tutorial-view.scss?inline';

@customElement('android-tutorial-view')
export class AndroidTutorialView extends LitElement {
  static styles = unsafeCSS(styles);

  render() {
    return html`
      <div class="tutorial-content">
        <h3 class="content-title">Android Tutorial</h3>
        <p class="tutorial-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        
        <p class="tutorial-text">
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </p>
        
        <p class="tutorial-text">
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
        </p>
      </div>
    `;
  }
}
