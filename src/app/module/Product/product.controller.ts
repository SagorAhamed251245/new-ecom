import { Request, Response } from 'express';
import { productsDB } from './product.service';
import { TProduct } from './product.interface';
import { productValidationSchema } from './product.validation';

const createProduct = async (req: Request, res: Response) => {
  const body = req.body;
  const validationResult = productValidationSchema.safeParse(body);

  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.error.errors[0].message,
      errors: 'Validation Error',
    });
  }
  try {
    const result = await productsDB.createProductDB(body);
    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong !',
      error: (error as Error).message || 'Internal Server Error',
    });
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  const { searchTerm } = req.query;

  try {
    const result = await productsDB.getAllProductsFromDB(searchTerm as string);
    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong !',
      error: 'Internal Server Error',
    });
  }
};

const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await productsDB.getSingleProductID(id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Product not found!',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: (error as Error).message || 'Internal Server Error',
    });
  }
};

const updatedProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const body: TProduct = req.body;

  // Validate the request body using Zod

  const validationResult = productValidationSchema.safeParse(body);

  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.error.errors[0].message,
      errors: 'Validation Error',
    });
  }
  try {
    const data = await productsDB.updatedProductID(id, body);
    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: (error as Error).message || 'Internal Server Error',
    });
  }
};
const deletedProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await productsDB.deleteProductID(id);
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: (error as Error).message || 'Internal Server Error',
    });
  }
};

export const productController = {
  createProduct,
  getAllProducts,
  getProductById,
  updatedProduct,
  deletedProduct,
};
