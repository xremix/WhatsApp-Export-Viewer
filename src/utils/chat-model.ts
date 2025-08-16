import { ChatRow } from '../types/index.js';

export class ChatModel {
  private rows: ChatRow[] = [];

  /**
   * Get all chat rows
   */
  getRows(): ChatRow[] {
    return [...this.rows];
  }

  /**
   * Add rows to the model
   */
  addRows(rows: ChatRow[]): void {
    this.rows.push(...rows);
  }

  /**
   * Clear all rows
   */
  clear(): void {
    this.rows = [];
  }

  /**
   * Get rows by sender
   */
  getRowsBySender(sender: string): ChatRow[] {
    return this.rows.filter(row => row.sender === sender);
  }

  /**
   * Get rows in date range
   */
  getRowsInDateRange(startDate: Date, endDate: Date): ChatRow[] {
    return this.rows.filter(row => 
      row.timestamp >= startDate && row.timestamp <= endDate
    );
  }

  /**
   * Get total row count
   */
  getRowCount(): number {
    return this.rows.length;
  }
}
