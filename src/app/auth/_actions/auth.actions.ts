"use server";
import { prisma } from "@/lib/prisma";

export async function createUser(email: string, password: string) {
  try {
    const user = await prisma.user.create({
      data: {
        email,
        password,
      },
    });
    return { data: user };
  } catch (error: any) {
    if (error.code === "P2002") {
      return { error: "email already taken" };
    }
    return { error: "something went wrong please try again" };
  }
}
