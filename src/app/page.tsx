import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getSession();
  if (user?.id) redirect("/invoices");
  else redirect("/auth/sign-up");
}
