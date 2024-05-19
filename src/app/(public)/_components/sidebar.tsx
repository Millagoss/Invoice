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
  // { link: "/resources", label: "Resources", icon: IconFiles },
];

function Sidebar() {
  const [active, setActive] = useState("Invoices");
  const links = data.map((item) => (
    <Link href={item.link} key={item.label}>
      <Text
        onClick={() => {
          setActive(item.label);
        }}
        className={`flex min-h-11 pl-4  hover:bg-slate-100 w-full items-center gap-4 ${
          active === item.label
            ? "text-primary-default border-r-4 border-primary-default"
            : "opacity-55"
        } `}
      >
        <item.icon className="" stroke={1.5} />
        {item.label}
      </Text>
    </Link>
  ));

  return (
    <Flex className="w-72 py-5 flex-col gap-2">
      <h2 className="font-bold text-2xl pl-4 mb-4">Menu</h2>
      {links}
    </Flex>
  );
}

export default Sidebar;
