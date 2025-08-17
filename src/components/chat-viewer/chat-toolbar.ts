import { LitElement, html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import styles from './chat-toolbar.scss?inline';

@customElement('chat-toolbar')
export class ChatToolbar extends LitElement {
  static styles = unsafeCSS(styles);

  private participants: string[] = [];
  private selectedOwnName: string = '';
  private searchTerm: string = '';
  private searchResultCount: number = 0;
  private currentSearchIndex: number = -1;

  setParticipants(participants: string[]) {
    this.participants = participants;
    this.requestUpdate();
  }

  setSelectedOwnName(ownName: string) {
    this.selectedOwnName = ownName;
    this.requestUpdate();
  }

  updateSearchResults(count: number, currentIndex: number = -1) {
    this.searchResultCount = count;
    this.currentSearchIndex = currentIndex;
    this.requestUpdate();
  }

  private handleOwnNameChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.selectedOwnName = select.value;
    this.dispatchOwnNameChange();
  }

  private handleSearchInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value;
    this.dispatchSearchChange();
  }

  private handleSearchKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.dispatchSearchNext();
    } else if (event.key === 'Escape') {
      // Clear search on escape
      this.searchTerm = '';
      this.dispatchSearchChange();
      (event.target as HTMLInputElement).value = '';
    }
  }

  private handleGlobalKeydown(event: KeyboardEvent) {
    // Ctrl+F to focus search
    if ((event.ctrlKey || event.metaKey) && event.key === 'f') {
      event.preventDefault();
      const searchInput = this.shadowRoot?.querySelector('.search-input') as HTMLInputElement;
      if (searchInput) {
        searchInput.focus();
        searchInput.select();
      }
    }
    
    // Ctrl+G to go to next search result
    if ((event.ctrlKey || event.metaKey) && event.key === 'g' && !event.shiftKey) {
      event.preventDefault();
      if (this.searchTerm.trim()) {
        this.dispatchSearchNext();
      }
    }
    
    // Ctrl+Shift+G to go to previous search result
    if ((event.ctrlKey || event.metaKey) && event.key === 'G' && event.shiftKey) {
      event.preventDefault();
      if (this.searchTerm.trim()) {
        this.dispatchSearchPrevious();
      }
    }
  }

  connectedCallback() {
    super.connectedCallback();
    // Add global keyboard listener
    document.addEventListener('keydown', this.handleGlobalKeydown.bind(this));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    // Remove global keyboard listener
    document.removeEventListener('keydown', this.handleGlobalKeydown.bind(this));
  }

  private dispatchOwnNameChange() {
    this.dispatchEvent(new CustomEvent('own-name-change', {
      detail: { ownName: this.selectedOwnName },
      bubbles: true,
      composed: true
    }));
  }

  private dispatchSearchChange() {
    this.dispatchEvent(new CustomEvent('search-change', {
      detail: { searchTerm: this.searchTerm },
      bubbles: true,
      composed: true
    }));
  }

  private dispatchSearchNext() {
    this.dispatchEvent(new CustomEvent('search-next', {
      detail: { searchTerm: this.searchTerm },
      bubbles: true,
      composed: true
    }));
  }

  private dispatchSearchPrevious() {
    this.dispatchEvent(new CustomEvent('search-previous', {
      detail: { searchTerm: this.searchTerm },
      bubbles: true,
      composed: true
    }));
  }

  private getUniqueParticipants(): string[] {
    return [...new Set(this.participants)]
      .filter(name => name.trim() !== '' && !name.includes('System'))
      .sort();
  }

  render() {
    const uniqueParticipants = this.getUniqueParticipants();
    
    return html`
      <div class="toolbar">
        <div class="left-section">
          <div class="search-container">
            <input 
              type="text" 
              class="search-input" 
              placeholder="Search messages..."
              .value=${this.searchTerm}
              @input=${this.handleSearchInput}
              @keydown=${this.handleSearchKeydown}
            />
            ${this.searchResultCount > 0 ? html`
              <div class="search-results">
                ${this.currentSearchIndex >= 0 ? `${this.currentSearchIndex + 1}` : '0'} of ${this.searchResultCount}
              </div>
            ` : ''}
          </div>
          <label class="label">You:</label>
          <div class="select-container">
            <select 
              class="select" 
              .value=${this.selectedOwnName}
              @change=${this.handleOwnNameChange}
            >
              ${uniqueParticipants.map(participant => 
                html`<option value="${participant}">${participant}</option>`
              )}
            </select>
          </div>
        </div>
      </div>
    `;
  }
}
