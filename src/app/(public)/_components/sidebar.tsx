"use client";
import { Flex, Text } from "@mantine/core";
import { IconAlignBoxLeftTop, IconLayoutDashboard } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";

const data = [
  { link: "/invoices", label: "Invoices", icon: IconLayoutDashboard },
  {
    link: "/create-invoice",
    label: "Create Invoice",
    icon: IconAlignBoxLeftTop,
  },
];

function Sidebar() {
  const [active, setActive] = useState("Invoices");
  const links = data.map((item) => (
    <Link href={item.link} key={item.label}>
      <Text
        onClick={() => {
          setActive(item.label);
        }}
        className={`flex min-h-11 pl-4 hover:bg-slate-100 w-32 lg:w-full items-center gap-4 ${
          active === item.label
            ? "text-primary-default bg-slate-100 lg:border-r-4 border-primary-default"
            : "opacity-55"
        } `}
      >
        <item.icon className="hidden lg:block" stroke={1.5} />
        {item.label}
      </Text>
    </Link>
  ));

  return (
    <Flex className="w-72 top-0 left-0 lg:h-full py-5 lg:flex-col flex-row gap-2">
      <h2 className="font-bold text-2xl pl-4 mb-4">Menu</h2>
      {links}
    </Flex>
  );
}

export default Sidebar;
