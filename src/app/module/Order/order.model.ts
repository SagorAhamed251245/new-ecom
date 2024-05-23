import mongoose, { Schema } from 'mongoose';
import { TOrder } from './order.interface';
import ProductsModel from '../Product/product.model';

const orderSchema = new Schema<TOrder>({
  email: {
    type: String,
    required: [true, 'Email is required.'],
    // match: [/.+\@.+\..+/, 'Please enter a valid email address.'],
  },
  productId: {
    type: String,
    required: [true, 'Product ID is required.'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required.'],
    min: [0, 'Price must be a positive number.'],
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required.'],
    min: [1, 'Quantity must be at least 1.'],
  },
});
//  middle ware

orderSchema.pre('save', async function (next) {
  try {
    const product = await ProductsModel.findById(this.productId);

    if (!product) {
      throw new Error('Product not found');
    }

    if (
      !product.inventory.inStock ||
      product.inventory.quantity < this.quantity
    ) {
      throw new Error('Insufficient quantity available in inventory');
    }

    product.inventory.quantity -= this.quantity;
    product.inventory.inStock = product.inventory.quantity > 0;

    await product.save();
    next();
  } catch (error) {
    next(error as Error);
  }
});
const OrderModel = mongoose.model<TOrder>('Order', orderSchema);

export default OrderModel;
