import { LitElement, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from './tutorial-view.scss?inline';
import './iphone-tutorial-view.js';
import './android-tutorial-view.js';

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
              ${this.activeTab === 'iphone' 
                ? html`<iphone-tutorial-view></iphone-tutorial-view>`
                : html`<android-tutorial-view></android-tutorial-view>`
              }
            </div>
          </div>
        </main>
      </div>
    `;
  }
}
