import { z } from 'zod';

export const variantsValidationSchema = z.object({
  type: z.string({ message: 'Type is required' }),
  value: z.string({ message: 'Value is required' }),
});

export const inventorySchema = z.object({
  quantity: z
    .number()
    .min(0, { message: 'Quantity must be a positive number' }),
  inStock: z.boolean().default(true),
});

export const productValidationSchema = z.object({
  name: z.string({ message: 'Name is required' }),
  description: z.string({ message: 'Description is required' }),
  price: z.number().min(0, { message: 'Price must be a positive number' }),
  category: z.string({ message: 'Category is required' }),
  tags: z.array(z.string()).min(1, { message: 'At least one tag is required' }),
  variants: z
    .array(variantsValidationSchema)
    .min(1, { message: 'At least one variant is required' }),
  inventory: inventorySchema,
});
