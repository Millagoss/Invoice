"use server";

import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export const getAllInvoices = async () => {
  const userId = cookies().get("InvoiceSession")?.value;
  if (!userId) {
    return { error: "User not logged in" };
  }
  try {
    const invoices = await prisma.invoice.findMany({
      where: { createdBy: Number(userId) },
      include: {
        client: true,
        items: true,
      },
    });

    const data = invoices.map((invoice) => ({
      ...invoice,
      dueDate: invoice.dueDate.toLocaleDateString("en-US"), // Format on server
    }));

    return { invoices: data };
  } catch (error) {
    return { error };
  }
};
