import { z } from "zod";

const userValidation = z.object({
  name: z.string({
    error: (iss) =>
      iss.input == undefined ? "Name is Required" : "Name must be a string",
  }),
  email: z.email("Invalid email"),
  password: z
    .string({
      error: (iss) =>
        iss.input == undefined
          ? "Password is Required"
          : "Password must be a string",
    })
    .max(20, { message: "Password must be less than 20 characters" }),
});
const userLogin = z.object({
  email: z.email("Invalid email"),
  password: z
    .string({
      error: (iss) =>
        iss.input == undefined
          ? "Password is Required"
          : "Password must be a string",
    })
    .max(20, { message: "Password must be less than 20 characters" }),
});

export const userValidationSchema = { userValidation, userLogin };
