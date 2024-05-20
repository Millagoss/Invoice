import { prisma } from "@/lib/prisma";
import UpdateInvoice from "../../_components/update-invoice";
import { getInvoice } from "../_action/invoice.action";

export default async function page({
  params: { id },
}: {
  params: { id: string };
}) {
  const { invoice, error } = await getInvoice(id);
  const clients = await prisma.client.findMany();

  if (error || !invoice) {
    return <h1>Invoice not found</h1>;
  }
  return <UpdateInvoice clients={clients} invoice={invoice} />;
}
