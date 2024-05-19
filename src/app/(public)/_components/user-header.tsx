"use client";
import { useAuth } from "@/providers/context";
import { Avatar, Box, Button, Divider, Flex, Text } from "@mantine/core";
import { IconBell, IconBellPlus, IconChevronDown } from "@tabler/icons-react";
import Link from "next/link";

const UserHeader = () => {
  const notification = true;
  const { user } = useAuth();

  return (
    <header>
      <Flex className="justify-between w-full">
        <Box>
          <Text className="font-bold">Hello, John</Text>
          <Text c="dimmed" className="text-sm">
            Have a nice day
          </Text>
        </Box>
        <Flex className="items-center gap-3 justify-center">
          <Box className="relative">
            {notification ? <IconBellPlus /> : <IconBell />}
          </Box>
          <Divider orientation="vertical" />
          {!user ? (
            <Button component={Link} href="/auth/sign-in">
              Login
            </Button>
          ) : (
            <Flex className="items-center gap-3 justify-center">
              <Avatar />
              <Box>
                <Text className="text-sm">{user.email}</Text>
              </Box>
              <IconChevronDown />
            </Flex>
          )}
        </Flex>
      </Flex>
    </header>
  );
};

export default UserHeader;
