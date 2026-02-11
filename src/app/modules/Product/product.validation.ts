import { z } from "zod";

export const createProductSchema = z.object({
  name: z
    .string({ error: "Product name must be string" })
    .trim()
    .min(1, "Product name is required"),
  description: z
    .string()
    .trim()
    .optional()
    .default("No details has been given"),
  price: z
    .number()
    .int("Price must be an integer")
    .nonnegative("Price cannot be negative"),
  stock: z
    .number()
    .int("Stock must be an integer")
    .nonnegative("Stock cannot be negative"),
});

export const productValidation = { createProductSchema };
