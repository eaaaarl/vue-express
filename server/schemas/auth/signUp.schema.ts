import { z } from "zod";

export const signUpSchema = z.object({
  email: z.string().email().min(1).max(255),
  password: z.string().min(8).max(255),
  name: z.string().optional(),
});
