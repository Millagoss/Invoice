"use client";
import { notify } from "@/components/notification/notification";
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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "../_actions/auth.actions";
import { SignInType, signInSchema } from "../_actions/user.schema";

function SignIn() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    getValues,
    register,
    formState: { errors },
  } = useForm<SignInType>();

  const handleSubmit = async () => {
    setLoading(true);
    const email = getValues().email;
    const password = getValues().password;

    const { success, error } = signInSchema.safeParse({
      email,
      password,
    });
    if (!success) {
      notify("Error", error.issues[0].message);
    } else {
      const { data, error } = await signIn(email, password);
      if (data) {
        notify("Success", `Welcome ${data.email}`);
        router.push("/invoices");
      } else notify("Error", `Login failed: ${error}`);
    }

    setLoading(false);
  };

  return (
    <Flex className="h-screen flex-col items-center justify-center px-1 md:flex-row md:px-32">
      <Paper className="w-1/2 px-0 md:px-20" withBorder={false} radius={0}>
        <Text className="text-3xl" ta="center" mt="md" mb={30}>
          Login
        </Text>

        <TextInput
          type="email"
          placeholder="Your Email"
          leftSection={<IconMail size="20px" />}
          size="md"
          {...register("email")}
          error={errors.email?.message}
        />
        <PasswordInput
          required
          placeholder="Your password"
          mt="md"
          size="md"
          leftSection={<IconPassword size="20px" />}
          {...register("password")}
          error={errors.password?.message}
        />

        <Button
          loading={loading}
          onClick={handleSubmit}
          fullWidth
          mt="xl"
          size="md"
        >
          Login
        </Button>

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
