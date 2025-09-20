import z from "zod";

export const SignupDto = z
  .object({
    name: z.string().max(100),
    email: z.email(),
    password: z.string().min(6),
  })
  .required();

export const LoginDto = z
  .object({
    email: z.email(),
    password: z.string(),
  })
  .required();
