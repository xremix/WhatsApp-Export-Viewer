import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('top-toolbar')
export class TopToolbar extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .toolbar {
      background-color: #25d366;
      padding: 1rem 1.5rem;
      margin: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 2rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      width: 100%;
      position: relative;
      z-index: 100;
    }

    .left-section {
      display: flex;
      align-items: center;
    }

    .header-icon {
      width: 24px;
      height: 24px;
      margin-right: 0.75rem;
      color: white;
    }

    .header-title {
      margin: 0;
      font-size: 1.125rem;
      color: white;
      font-weight: 600;
    }

    .right-section {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .toolbar-button {
      background: none;
      border: none;
      color: white;
      padding: 0.5rem;
      border-radius: 0.375rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.2s ease;

      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }

      &:active {
        background-color: rgba(255, 255, 255, 0.2);
      }
    }

    .toolbar-button svg {
      width: 20px;
      height: 20px;
    }

    .chat-info {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }

    .chat-name {
      color: white;
      font-size: 1rem;
      font-weight: 600;
      margin: 0;
    }

    .chat-status {
      color: rgba(255, 255, 255, 0.8);
      font-size: 0.75rem;
      margin: 0;
    }
  `;

  private _title = 'WhatsApp Viewer';
  private _chatName?: string;
  private _chatStatus?: string;
  private _showBackButton = false;
  private _showMenuButton = false;
  private _showSearchButton = false;
  private _showMoreButton = false;

  get title() { return this._title; }
  set title(value: string) { 
    this._title = value; 
    this.requestUpdate('title');
  }

  get chatName() { return this._chatName; }
  set chatName(value: string | undefined) { 
    this._chatName = value; 
    this.requestUpdate('chatName');
  }

  get chatStatus() { return this._chatStatus; }
  set chatStatus(value: string | undefined) { 
    this._chatStatus = value; 
    this.requestUpdate('chatStatus');
  }

  get showBackButton() { return this._showBackButton; }
  set showBackButton(value: boolean) { 
    this._showBackButton = value; 
    this.requestUpdate('showBackButton');
  }

  get showMenuButton() { return this._showMenuButton; }
  set showMenuButton(value: boolean) { 
    this._showMenuButton = value; 
    this.requestUpdate('showMenuButton');
  }

  get showSearchButton() { return this._showSearchButton; }
  set showSearchButton(value: boolean) { 
    this._showSearchButton = value; 
    this.requestUpdate('showSearchButton');
  }

  get showMoreButton() { return this._showMoreButton; }
  set showMoreButton(value: boolean) { 
    this._showMoreButton = value; 
    this.requestUpdate('showMoreButton');
  }

  render() {
    return html`
      <div class="toolbar">
        <div class="left-section">
          ${this.showBackButton ? html`
            <button class="toolbar-button" @click=${this.handleBackClick}>
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd"/>
              </svg>
            </button>
          ` : html`
            <svg class="header-icon" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
            </svg>
          `}
          
          <h1 class="header-title">${this.title}</h1>
        </div>

        <div class="right-section">
          ${this.chatName ? html`
            <div class="chat-info">
              <h1 class="chat-name">${this.chatName}</h1>
              ${this.chatStatus ? html`<p class="chat-status">${this.chatStatus}</p>` : ''}
            </div>
          ` : ''}
          
          ${this.showSearchButton ? html`
            <button class="toolbar-button" @click=${this.handleSearchClick}>
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"/>
              </svg>
            </button>
          ` : ''}
          
          ${this.showMenuButton ? html`
            <button class="toolbar-button" @click=${this.handleMenuClick}>
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
              </svg>
            </button>
          ` : ''}
          
          ${this.showMoreButton ? html`
            <button class="toolbar-button" @click=${this.handleMoreClick}>
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
              </svg>
            </button>
          ` : ''}
        </div>
      </div>
    `;
  }

  private handleBackClick() {
    this.dispatchEvent(new CustomEvent('back-click'));
  }

  private handleSearchClick() {
    this.dispatchEvent(new CustomEvent('search-click'));
  }

  private handleMenuClick() {
    this.dispatchEvent(new CustomEvent('menu-click'));
  }

  private handleMoreClick() {
    this.dispatchEvent(new CustomEvent('more-click'));
  }
}
