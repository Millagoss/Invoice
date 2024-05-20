"use server";

import { prisma } from "@/lib/prisma";
import { InvoiceData } from "@/types/invoice";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

interface UpdateInvoice extends InvoiceData {
  id: string | number;
  items?: {
    description: string;
    price: number;
  }[];
}

interface Items {
  invoiceId: string | number;
  item: { description: string; price: number | string };
}

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
    console.log(error);
    return { error: "error getting invoices" };
  }
};

export const getInvoice = async (id: string) => {
  const userId = cookies().get("InvoiceSession")?.value;
  try {
    const invoice = await prisma.invoice.findUnique({
      where: { id: Number(id), createdBy: Number(userId) },
      include: {
        client: true,
        items: true,
      },
    });
    if (invoice === null) return { error: "invoice not found" };
    const data = {
      ...invoice,
      dueDate: invoice.dueDate.toLocaleDateString("en-US"),
    };
    return { invoice: data };
  } catch (error) {
    console.log(error);
    return { error: "error getting invoice" };
  }
};

export const updateInvoice = async (invoice: UpdateInvoice) => {
  try {
    const updatedInvoice = await prisma.invoice.update({
      where: { id: Number(invoice.id) },
      data: {
        client: {
          connect: { id: Number(invoice.client) },
        },
        number: invoice.number,
        total: invoice.total,
        dueDate: new Date(invoice.dueDate || ""),
      },
      include: {
        client: true,
        items: true,
      },
    });
    return { data: updatedInvoice };
  } catch (error) {
    console.log(error);
    return { error: "error updating invoice" };
  }
};

export const deleteInvoice = async (id: string | number) => {
  try {
    await prisma.invoiceItem.deleteMany({
      where: {
        invoiceId: Number(id),
      },
    });
    const deletedInvoice = await prisma.invoice.delete({
      where: { id: Number(id) },
    });
    revalidatePath("/invoices");
    return { data: deletedInvoice };
  } catch (error) {
    console.log(error);
    return { error: "error deleting invoice" };
  }
};

export const addItem = async (invoiceItems: Items) => {
  const { invoiceId, item } = invoiceItems;

  try {
    const data = await prisma.invoiceItem.create({
      data: {
        invoice: {
          connect: { id: Number(invoiceId) },
        },
        description: item.description,
        price: Number(item.price),
      },
    });
    return { data };
  } catch (error) {
    console.log(error);
    return { error: "error adding item" };
  }
};

export const deleteItem = async (id: number) => {
  try {
    const data = await prisma.invoiceItem.delete({
      where: { id: Number(id) },
    });
    return { data };
  } catch (error) {
    console.log(error);
    return { error: "error deleting item" };
  }
};
