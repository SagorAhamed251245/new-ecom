"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const product_model_1 = __importDefault(require("./product.model"));
const createProductDB = (product) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.default.create(product);
    return result;
});
const getAllProductsFromDB = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    if (searchTerm) {
        const result = yield product_model_1.default.find({
            $or: [
                { category: { $regex: searchTerm, $options: 'i' } },
                { name: { $regex: searchTerm, $options: 'i' } },
            ],
        });
        return result;
    }
    else {
        const result = yield product_model_1.default.find();
        return result;
    }
});
const getSingleProductID = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.default.findOne({ _id: _id });
    return result;
});
const updatedProductID = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const objectId = new mongoose_1.default.Types.ObjectId(id);
    const aggregate = yield product_model_1.default.aggregate([
        { $match: { _id: objectId } },
    ]);
    if (aggregate.length === 0) {
        throw new Error('Product not found');
    }
    if (data.inventory.quantity > 0) {
        const updatedData = Object.assign(Object.assign({}, data), { inventory: Object.assign(Object.assign({}, data.inventory), { inStock: true }) });
        const result = yield product_model_1.default.findOneAndUpdate({ _id: objectId }, { $set: updatedData }, { new: true });
        return result;
    }
    else {
        const updatedData = Object.assign(Object.assign({}, data), { inventory: Object.assign(Object.assign({}, data.inventory), { inStock: false }) });
        const result = yield product_model_1.default.findOneAndUpdate({ _id: objectId }, { $set: updatedData }, { new: true });
        return result;
    }
});
const deleteProductID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // Convert id to ObjectId
    const objectId = new mongoose_1.default.Types.ObjectId(id);
    // Aggregate to find the product
    const aggregate = yield product_model_1.default.aggregate([
        { $match: { _id: objectId } },
    ]);
    // Check if the product was found
    if (aggregate.length === 0) {
        throw new Error('Product not found');
    }
    // Delete the product
    const result = yield product_model_1.default.findOneAndDelete({ _id: id });
    return result;
});
exports.productsDB = {
    createProductDB,
    getAllProductsFromDB,
    getSingleProductID,
    updatedProductID,
    deleteProductID,
};
