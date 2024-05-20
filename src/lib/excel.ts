import * as XLSX from "xlsx";

export const exportInvoices = (invoices: any) => {
  const worksheet = XLSX.utils.json_to_sheet(invoices);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Invoices");

  XLSX.writeFile(workbook, "Employee Lists.xlsx", { compression: true });
};
