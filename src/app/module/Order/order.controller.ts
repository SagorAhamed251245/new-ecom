import { Request, Response } from 'express';
import { OrderDB } from './order.service';
import orderValidationSchema from './order.validation';

const createOrder = async (req: Request, res: Response) => {
  const body = req.body;

  // Validate the request body using Zod

  const validationResult = orderValidationSchema.safeParse(body);

  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.error.errors[0].message,
      errors: 'Validation Error',
    });
  }
  try {
    const result = await OrderDB.createOrderDB(body);

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Order is not created successfully!',
      error: (error as Error).message || 'Internal Server Error',
    });
  }
};
const getAllOrders = async (req: Request, res: Response) => {
  const { email } = req.query;
  if (email) {
    try {
      const result = await OrderDB.getAllOrdersFromDB(email as string);
      res.status(200).json({
        success: true,
        message: 'Orders fetched successfully for user email!',
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Order not found !',
        error: (error as Error).message || 'Internal Server Error',
      });
    }
  } else {
    try {
      const result = await OrderDB.getAllOrdersFromDB(email as string);
      res.status(200).json({
        success: true,
        message: 'Orders fetched successfully!',
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Something went wrong !',
        error: (error as Error).message || 'Internal Server Error',
      });
    }
  }
};

export const orderController = {
  createOrder,
  getAllOrders,
};
