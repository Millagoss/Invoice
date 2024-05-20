import { Box } from "@mantine/core";
import InvoiceList from "../_components/invoice-list";
import { getAllInvoices } from "./_action/invoice.action";

const page = async () => {
  const { invoices } = await getAllInvoices();

  return (
    <Box className="w-full overflow-x-scroll bg-primary-body">
      <Box className="px-2 py-5">
        <InvoiceList invoices={invoices} title="Invoices" />
      </Box>
    </Box>
  );
};

export default page;
