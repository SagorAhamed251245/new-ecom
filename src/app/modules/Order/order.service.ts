import { TOrder } from './order.interface';
import OrderModel from './order.model';

const createOrderDB = async (order: TOrder) => {
  const result = await OrderModel.create(order);
  return result;
};
const getAllOrdersFromDB = async (queryEmail: string) => {
  if (queryEmail) {
    const aggregate = await OrderModel.aggregate([
      { $match: { email: queryEmail } },
    ]);

    if (aggregate.length === 0) {
      throw new Error('Order not found');
    }
    const result = await OrderModel.find({
      email: { $regex: queryEmail, $options: 'i' },
    });

    return result;
  } else {
    const result = await OrderModel.find();

    return result;
  }
};

export const OrderDB = {
  createOrderDB,
  getAllOrdersFromDB,
};
