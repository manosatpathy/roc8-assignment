import { z } from "zod";

export const userAuthenticateSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
});
