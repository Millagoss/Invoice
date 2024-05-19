import { z } from "zod";
export const signUpSchema = z.object({
  email: z
    .string({
      invalid_type_error: "Invalid Email",
    })
    .email()
    .min(5),
  password: z.string().min(5),
  confirmPassword: z.string().min(5),
});

export const signInSchema = z.object({
  email: z
    .string({
      invalid_type_error: "Invalid Email",
    })
    .email()
    .min(5),
  password: z.string().min(5),
});

export type SignUpType = z.infer<typeof signUpSchema>;
export type SignInType = z.infer<typeof signInSchema>;
