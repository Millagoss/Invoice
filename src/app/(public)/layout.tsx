import { getSession } from "@/lib/session";
import { Box, Flex } from "@mantine/core";
import { redirect } from "next/navigation";
import React from "react";
import Sidebar from "./_components/sidebar";
import UserHeader from "./_components/user-header";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userId = await getSession();

  if (userId === null) {
    redirect("/auth/sign-up");
  }

  return (
    <Flex>
      <Sidebar />
      <Box className="gap-10 flex flex-col px-10 py-5 w-full bg-primary-background">
        <UserHeader />
        {children}
      </Box>
    </Flex>
  );
}
