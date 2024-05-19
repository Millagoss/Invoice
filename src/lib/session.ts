import { cookies } from "next/headers";
import "server-only";

export const getSession = async function () {
  const userId = cookies().get("InvoiceSession")?.value;

  if (!userId) return null;

  return userId;
};
export const createSession = async function (userId: string) {
  cookies().set("InvoiceSession", userId);
};
