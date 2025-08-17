import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('chat-toolbar')
export class ChatToolbar extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .toolbar {
      background-color: #f8f9fa;
      border-bottom: 1px solid #e9ecef;
      padding: 0.75rem 1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 1.5rem;
      width: 100%;
      position: relative;
      z-index: 50;
    }

    .left-section {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .label {
      font-size: 0.875rem;
      color: #6c757d;
      font-weight: 500;
      margin: 0;
    }

    .select-container {
      position: relative;
    }

    .select {
      background-color: white;
      border: 1px solid #ced4da;
      border-radius: 0.375rem;
      padding: 0.5rem 0.75rem;
      font-size: 0.875rem;
      color: #495057;
      cursor: pointer;
      min-width: 120px;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;

      &:hover {
        border-color: #adb5bd;
      }

      &:focus {
        outline: none;
        border-color: #25d366;
        box-shadow: 0 0 0 2px rgba(37, 211, 102, 0.25);
      }
    }
  `;

  private participants: string[] = [];
  private selectedOwnName: string = '';

  setParticipants(participants: string[]) {
    this.participants = participants;
    this.requestUpdate();
  }

  setSelectedOwnName(ownName: string) {
    this.selectedOwnName = ownName;
    this.requestUpdate();
  }

  private handleOwnNameChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.selectedOwnName = select.value;
    this.dispatchOwnNameChange();
  }

  private dispatchOwnNameChange() {
    this.dispatchEvent(new CustomEvent('own-name-change', {
      detail: { ownName: this.selectedOwnName },
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
