import { cookies } from "next/headers";
import { cache } from "react";
import "server-only";
import { prisma } from "./prisma";

export const getSession = cache(async function () {
  const userId = cookies().get("InvoiceSession")?.value;

  if (!userId) return;

  const user = await prisma.user.findUnique({
    where: {
      id: Number(userId),
    },
    select: {
      id: true,
      email: true,
    },
  });

  if (!user) return;

  return user;
});
export const createSession = async function (userId: string) {
  cookies().set("InvoiceSession", userId);
};
