"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidationSchema = exports.inventorySchema = exports.variantsValidationSchema = void 0;
const zod_1 = require("zod");
exports.variantsValidationSchema = zod_1.z.object({
    type: zod_1.z.string({ message: 'Type is required' }),
    value: zod_1.z.string({ message: 'Value is required' }),
});
exports.inventorySchema = zod_1.z.object({
    quantity: zod_1.z
        .number()
        .min(0, { message: 'Quantity must be a positive number' }),
    inStock: zod_1.z.boolean().default(true),
});
exports.productValidationSchema = zod_1.z.object({
    name: zod_1.z.string({ message: 'Name is required' }),
    description: zod_1.z.string({ message: 'Description is required' }),
    price: zod_1.z.number().min(0, { message: 'Price must be a positive number' }),
    category: zod_1.z.string({ message: 'Category is required' }),
    tags: zod_1.z.array(zod_1.z.string()).min(1, { message: 'At least one tag is required' }),
    variants: zod_1.z
        .array(exports.variantsValidationSchema)
        .min(1, { message: 'At least one variant is required' }),
    inventory: exports.inventorySchema,
});
