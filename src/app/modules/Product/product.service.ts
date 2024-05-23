import mongoose from 'mongoose';
import { TProduct } from './product.interface';
import ProductsModel from './product.model';

const createProductDB = async (product: TProduct) => {
  const result = await ProductsModel.create(product);
  return result;
};

const getAllProductsFromDB = async (searchTerm: string) => {
  if (searchTerm) {
    const result = await ProductsModel.find({
      $or: [
        { category: { $regex: searchTerm, $options: 'i' } },
        { name: { $regex: searchTerm, $options: 'i' } },
      ],
    });

    return result;
  } else {
    const result = await ProductsModel.find();
    return result;
  }
};
const getSingleProductID = async (_id: string) => {
  const result = await ProductsModel.findOne({ _id: _id });
  return result;
};

const updatedProductID = async (id: string, data: TProduct) => {
  const objectId = new mongoose.Types.ObjectId(id);

  const aggregate = await ProductsModel.aggregate([
    { $match: { _id: objectId } },
  ]);

  if (aggregate.length === 0) {
    throw new Error('Product not found');
  }
  if (data.inventory.quantity > 0) {
    const updatedData = {
      ...data,
      inventory: {
        ...data.inventory,
        inStock: true,
      },
    };
    const result = await ProductsModel.findOneAndUpdate(
      { _id: objectId },
      { $set: updatedData },
      { new: true },
    );
    return result;
  } else {
    const updatedData = {
      ...data,
      inventory: {
        ...data.inventory,
        inStock: false,
      },
    };
    const result = await ProductsModel.findOneAndUpdate(
      { _id: objectId },
      { $set: updatedData },
      { new: true },
    );
    return result;
  }
};

const deleteProductID = async (id: string) => {
  // Convert id to ObjectId
  const objectId = new mongoose.Types.ObjectId(id);

  // Aggregate to find the product
  const aggregate = await ProductsModel.aggregate([
    { $match: { _id: objectId } },
  ]);

  // Check if the product was found
  if (aggregate.length === 0) {
    throw new Error('Product not found');
  }

  // Delete the product
  const result = await ProductsModel.findOneAndDelete({ _id: id });

  return result;
};

export const productsDB = {
  createProductDB,
  getAllProductsFromDB,
  getSingleProductID,
  updatedProductID,
  deleteProductID,
};
