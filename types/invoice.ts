export interface InvoiceData {
  number: string;
  items: { description: string; price: number }[];
  total: number;
  dueDate: Date | null;
  client: string;
}
