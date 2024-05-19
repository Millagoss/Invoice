export interface InvoiceData {
  number: string;
  items: { description: string; price: number }[];
  total: number;
  dueDate: Date | null;
  client: string;
}

interface items {
  client: {
    id: number;
    name: string;
    email: string;
  };
  items: {
    id: number;
    invoiceId: number;
    description: string;
    price: number;
  }[];
}
export interface InvoiceListType extends items {
  id: number;
  number: string;
  clientId: number;
  total: number;
  dueDate: string;
  createdBy: number;
}
