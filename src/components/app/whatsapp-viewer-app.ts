import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import '../onboarding/onboarding-view';


@customElement('whatsapp-viewer-app')
export class WhatsAppViewerApp extends LitElement {

    static styles = css`
    :host {
      display: block;
      height: 100vh;
    }
  `;

  constructor() {
    super();
  }

    render() {
    return html`
      <onboarding-view></onboarding-view>
    `;
  }
}
