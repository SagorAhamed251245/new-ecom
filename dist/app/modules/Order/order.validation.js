"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const orderValidationSchema = zod_1.z.object({
    email: zod_1.z
        .string({ message: 'Email is required' })
        .email('Invalid email format!'),
    productId: zod_1.z.string({ message: 'Product Id is required' }),
    price: zod_1.z.number().min(0, { message: 'Price must be a positive number' }),
    quantity: zod_1.z.number().min(1, { message: 'Quantity must be at lest 1' }),
});
exports.default = orderValidationSchema;
