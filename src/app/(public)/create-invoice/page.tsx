import { prisma } from "@/lib/prisma";
import CreateInvoice from "../_components/create-invoice";

export default async function page() {
  const clients = await prisma.client.findMany();

  return <CreateInvoice clients={clients} />;
}
