import {
  Button,
  Flex,
  Paper,
  PasswordInput,
  Text,
  TextInput,
} from "@mantine/core";
import { IconMail, IconPassword } from "@tabler/icons-react";
import Link from "next/link";

function SignIn() {
  return (
    <Flex className="h-screen flex-col items-center justify-center px-1 md:flex-row md:px-32">
      <Paper className="w-1/2 px-0 md:px-20" withBorder={false} radius={0}>
        <Text className="text-3xl" ta="center" mt="md" mb={30}>
          Login
        </Text>

        <TextInput
          placeholder="Your Email"
          leftSection={<IconMail size="20px" />}
          size="md"
        />
        <PasswordInput
          placeholder="Your password"
          mt="md"
          size="md"
          leftSection={<IconPassword size="20px" />}
        />

        <Button component={Link} href="/dashboard" fullWidth mt="xl" size="md">
          Login
        </Button>
        <span className="mt-2 block text-right">
          <Text
            component={Link}
            href="/auth/reset"
            ta="right"
            c="dimmed"
            className="text-sm"
          >
            Forget Password
          </Text>
        </span>
        <Text ta="center" c="dimmed" mt="lg">
          I don&quot;t have an account ?
          <Link className="text-primary-default" href="/auth/sign-up">
            Sign up
          </Link>
        </Text>
      </Paper>
    </Flex>
  );
}

export default SignIn;
