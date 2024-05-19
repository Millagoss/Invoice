"use client";
import { signOut } from "@/app/auth/_actions/auth.actions";
import { useAuth } from "@/providers/context";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Menu,
  MenuItem,
  Text,
} from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import Link from "next/link";

const UserHeader = () => {
  const { user } = useAuth();

  return (
    <header>
      <Flex className="justify-between w-full">
        <Box>
          <span className="flex items-center gap-2">
            {user && (
              <>
                <Text>Hello,</Text>
                <Text className="font-bold">{user?.email}</Text>
              </>
            )}
          </span>
        </Box>
        <Flex className="items-center gap-3 justify-center">
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
              <Menu>
                <Menu.Target>
                  <IconChevronDown />
                </Menu.Target>
                <Menu.Dropdown>
                  <MenuItem className="p-0">
                    <Button variant="transparent" onClick={() => signOut()}>
                      Log out
                    </Button>
                  </MenuItem>
                </Menu.Dropdown>
              </Menu>
            </Flex>
          )}
        </Flex>
      </Flex>
    </header>
  );
};

export default UserHeader;
