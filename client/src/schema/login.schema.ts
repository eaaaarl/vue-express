import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

export const loginSchema = toTypedSchema(
  z.object({
    email: z.string().email().min(1, "Email is required"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
  })
);
