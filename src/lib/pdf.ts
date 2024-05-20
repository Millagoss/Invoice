import jsPDF from "jspdf";

export const exportInvoiceToPDF = (invoice: any) => {
  const doc = new jsPDF();

  // Add invoice details (ID, number, client name, total, etc.)
  doc.text(`Invoice ID: ${invoice.id}`, 10, 10);
  doc.text(`Invoice Number: ${invoice.number}`, 10, 15);
  doc.text(`Client: ${invoice.client.name}`, 10, 20);
  doc.text(`Total: ${invoice.total}`, 10, 25);

  // Add details for items in the invoice (assuming 'items' is an array of objects)
  let yPosition = 30; // Starting position for item details
  invoice.items.forEach((item: any) => {
    doc.text(`- ${item.name} (${item.quantity})`, 10, yPosition);
    yPosition += 5; // Adjust spacing between items
  });

  // Save the PDF
  doc.save("invoice.pdf");
};
