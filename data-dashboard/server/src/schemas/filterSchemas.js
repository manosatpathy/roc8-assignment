import { z } from "zod";

export const filterQuerySchema = z.object({
  age: z.enum(["15-25", ">25"]),
  gender: z.enum(["Male", "Female"]),
  startDate: z.string(),
  endDate: z.string(),
});

export const featureQuerySchema = z.object({
  age: z.enum(["15-25", ">25"]),
  gender: z.enum(["Male", "Female"]),
  startDate: z.string(),
  endDate: z.string(),
  feature: z.enum(["a", "b", "c", "d", "e", "f"]),
});
