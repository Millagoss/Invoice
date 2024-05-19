"use server";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/session";

export async function signUp(email: string, password: string) {
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

export async function signIn(email: string, password: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user && user.password === password) {
      await createSession(JSON.stringify(user.id));
      return { data: user };
    } else if (user && user.password !== password) {
      return { error: "Incorrect Password" };
    }
    return { error: "User not Found" };
  } catch (error: any) {
    if (error.code === "P2002") {
      return { error: "email already taken" };
    }
    return { error: "something went wrong please try again" };
  }
}
