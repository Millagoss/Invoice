"use client";
import { Flex, Text } from "@mantine/core";
import {
  IconAlignBoxLeftTop,
  IconFiles,
  IconLayoutDashboard,
} from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";

const data = [
  { link: "/dashboard", label: "Dashboard", icon: IconLayoutDashboard },
  { link: "/complaints", label: "Complaints", icon: IconAlignBoxLeftTop },
  { link: "/resources", label: "Resources", icon: IconFiles },
];

function Sidebar() {
  const [active, setActive] = useState("Dashboard");
  const links = data.map((item) => (
    <Link href={item.link} key={item.label}>
      <Text
        onClick={() => {
          setActive(item.label);
        }}
        className={`flex min-h-11 w-full items-center gap-4 ${
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

  return <Flex className="w-full flex-col gap-2">{links}</Flex>;
}

export default Sidebar;
