import { Box, Text } from "@mantine/core";
import InvoiceList from "../_components/invoice-list";
import { getAllInvoices } from "./_action/invoice";

const page = async () => {
  const { invoices } = await getAllInvoices();

  return (
    <Box className="w-full bg-primary-body">
      <Box className="px-2 py-5">
        <Text className="text-xl px-4 font-bold">Invoices</Text>
        <InvoiceList invoices={invoices} />
      </Box>
    </Box>
  );
};

export default page;
