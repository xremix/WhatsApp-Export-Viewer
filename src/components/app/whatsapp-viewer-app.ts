import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '../onboarding/onboarding-view';
import { chatStateService } from '../../utils/chat-state-service.js';
import { AppState } from '../../types/index.js';


@customElement('whatsapp-viewer-app')
export class WhatsAppViewerApp extends LitElement {

    static styles = css`
    :host {
      display: block;
      height: 100vh;
    }
  `;

  private appState: AppState = chatStateService.getState();

  private unsubscribe: (() => void) | null = null;

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    this.unsubscribe = chatStateService.subscribe((state) => {
      this.appState = state;
      this.requestUpdate();
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

    render() {
    return html`
      ${this.appState.messages.length > 0 
        ? html`<div>Chat loaded with ${this.appState.messages.length} messages</div>`
        : html`<onboarding-view></onboarding-view>`
      }
    `;
  }
}
