import { LitElement, html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import styles from './features-view.scss?inline';

interface Feature {
  title: string;
  description: string;
  icon: string;
}

@customElement('features-view')
export class FeaturesView extends LitElement {
  static styles = unsafeCSS(styles);

  private features: Feature[] = [
    {
      title: 'Secure',
      description: 'App works in the browser and stays on your computer, never uploaded.',
      icon: 'M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z'
    },
    {
      title: 'Search',
      description: 'Quickly find messages, media, and contacts within your chat history.',
      icon: 'M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
    },
    {
      title: 'Insights',
      description: 'Gain insights into your core patterns and most activity.',
      icon: 'M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z'
    }
  ];

  render() {
    return html`
      <div class="features-container">
        <main class="main-content">
          <h2 class="page-title">Key Features</h2>
          
          <div class="features-grid">
            ${this.features.map(feature => html`
              <div class="feature-card">
                <svg class="feature-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path d="${feature.icon}"/>
                </svg>
                <h3 class="feature-title">${feature.title}</h3>
                <p class="feature-description">${feature.description}</p>
              </div>
            `)}
          </div>

          <div class="pagination">
            <div class="pagination-dot active"></div>
            <div class="pagination-dot"></div>
            <div class="pagination-dot"></div>
          </div>
        </main>
      </div>
    `;
  }
}
