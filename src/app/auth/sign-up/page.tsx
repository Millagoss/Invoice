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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { createUser } from "../_actions/auth.actions";
import { User, userSchema } from "../_actions/user.schema";

function SignUp() {
  const [loading, setLoading] = useState(false);

  const {
    getValues,
    register,
    formState: { errors },
  } = useForm<User>();

  const handleSubmit = async () => {
    setLoading(true);
    const email = getValues().email;
    const password = getValues().password;
    const confirmPassword = getValues().confirmPassword;

    const validatedFields = userSchema.safeParse({
      email,
      password,
      confirmPassword,
    });
    if (!validatedFields.success) {
      notify("Error", validatedFields.error.issues[0].message);
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      notify("Error", "Password does not match");
    } else {
      const { data, error } = await createUser(email, password);
      if (data) notify("Success", "User created successfully, you can sign-in");
      else notify("Error", `User creation failed: ${error}`);
    }
    setLoading(false);
  };

  return (
    <Flex className="h-screen flex-col items-center justify-center px-1 md:flex-row md:px-32">
      <Paper className="w-1/2 px-0 md:px-20" withBorder={false} radius={0}>
        <Text className="text-3xl" ta="center" mt="md" mb={30}>
          Create Account
        </Text>
        <form>
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
          <PasswordInput
            required
            placeholder="Confirm password"
            mt="md"
            size="md"
            leftSection={<IconPassword size="20px" />}
            {...register("confirmPassword")}
          />
          <Button
            loading={loading}
            onClick={handleSubmit}
            fullWidth
            mt="xl"
            size="md"
          >
            Create Account
          </Button>
        </form>

        <Text ta="center" c="dimmed" mt="lg">
          I have an account?{" "}
          <Link className="text-primary-default" href="/auth/sign-in">
            Sign In
          </Link>
        </Text>
      </Paper>
    </Flex>
  );
}

export default SignUp;
