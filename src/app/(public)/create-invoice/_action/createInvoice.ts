"use server";
import { prisma } from "@/lib/prisma";
import { InvoiceData } from "@/types/invoice";
import { revalidatePath } from "next/cache";

interface Invoice extends InvoiceData {
  userId: string | number | undefined;
}

export const createInvoice = async (data: Invoice) => {
  const { number, items, total, dueDate, client, userId } = data;
  try {
    const response = await prisma.invoice.create({
      data: {
        number,
        clientId: Number(client),
        items: {
          create: items?.map((item) => ({
            description: item.description,
            price: item.price,
          })),
        },
        total,
        dueDate: new Date(dueDate || ""),
        createdBy: Number(userId),
      },
    });
    revalidatePath("/invoices");
    return { data: response };
  } catch (error) {
    return { error: "error creating invoice" };
  }
};
