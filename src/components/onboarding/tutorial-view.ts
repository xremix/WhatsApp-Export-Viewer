import { LitElement, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from './tutorial-view.scss?inline';

@customElement('tutorial-view')
export class TutorialView extends LitElement {
  static styles = unsafeCSS(styles);

  private _activeTab: 'iphone' | 'android' = 'iphone';

  @property({ type: String })
  get activeTab(): 'iphone' | 'android' {
    return this._activeTab;
  }

  set activeTab(value: 'iphone' | 'android') {
    this._activeTab = value;
  }

  private switchTab(tab: 'iphone' | 'android') {
    this.activeTab = tab;
  }

  render() {
    return html`
      <div class="tutorial-container">
        <main class="main-content">
          <h2 class="page-title">Tutorial</h2>
          
          <div class="tabs-container">
            <div class="tabs-header">
              <button 
                class="tab-button ${this.activeTab === 'iphone' ? 'active' : ''}"
                @click=${() => this.switchTab('iphone')}
              >
                iPhone
              </button>
              <button 
                class="tab-button ${this.activeTab === 'android' ? 'active' : ''}"
                @click=${() => this.switchTab('android')}
              >
                Android
              </button>
            </div>
            
            <div class="tab-content">
              ${this.activeTab === 'iphone' ? this.renderIphoneContent() : this.renderAndroidContent()}
            </div>
          </div>
        </main>
      </div>
    `;
  }

  private renderIphoneContent() {
    return html`
      <div class="tutorial-content">
        <h3 class="content-title">iPhone Tutorial</h3>
        <p class="tutorial-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        
        <p class="tutorial-text">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        
        <p class="tutorial-text">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
        </p>
      </div>
    `;
  }

  private renderAndroidContent() {
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
