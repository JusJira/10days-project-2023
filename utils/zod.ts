import { z } from "zod";

export const productSchema = z.object({
    price: z.coerce
      .number({
        required_error: "Price is required",
        invalid_type_error: "Price must be a number",
      })
      .gt(0, {
        message: "Amount must be more than zero.",
      }),
    name: z.string({
      required_error: "Name is required.",
    }),
    description: z.string().optional(),
    stock: z.coerce.number({
      required_error: "Amount is required",
      invalid_type_error: "Amount must be a number",
    }).gte(0),
    image: z.string().optional()
  });