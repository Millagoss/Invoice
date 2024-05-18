import { z } from "zod";
export const userSchema = z.object({
  email: z
    .string({
      invalid_type_error: "Invalid Email",
    })
    .email()
    .min(5),
  password: z.string().min(5),
  confirmPassword: z.string().min(5),
});

export type User = z.infer<typeof userSchema>;
