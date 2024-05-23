import { z } from 'zod';

const orderValidationSchema = z.object({
  email: z
    .string({ message: 'Email is required' })
    .email('Invalid email format!'),
  productId: z.string({ message: 'Product Id is required' }),
  price: z.number().min(0, { message: 'Price must be a positive number' }),
  quantity: z.number().min(1, { message: 'Quantity must be at lest 1' }),
});

export default orderValidationSchema;
