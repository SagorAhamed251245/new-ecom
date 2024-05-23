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
Object.defineProperty(exports, "__esModule", { value: true });
exports.productController = void 0;
const product_service_1 = require("./product.service");
const product_validation_1 = require("./product.validation");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const validationResult = product_validation_1.productValidationSchema.safeParse(body);
    if (!validationResult.success) {
        return res.status(400).json({
            success: false,
            message: validationResult.error.errors[0].message,
            errors: 'Validation Error',
        });
    }
    try {
        const result = yield product_service_1.productsDB.createProductDB(body);
        res.status(200).json({
            success: true,
            message: 'Product created successfully!',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong !',
            error: error.message || 'Internal Server Error',
        });
    }
});
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = req.query;
    try {
        const result = yield product_service_1.productsDB.getAllProductsFromDB(searchTerm);
        res.status(200).json({
            success: true,
            message: 'Products fetched successfully!',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong !',
            error: 'Internal Server Error',
        });
    }
});
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const result = yield product_service_1.productsDB.getSingleProductID(id);
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong!',
            error: error.message || 'Internal Server Error',
        });
    }
});
const updatedProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const body = req.body;
    // Validate the request body using Zod
    const validationResult = product_validation_1.productValidationSchema.safeParse(body);
    if (!validationResult.success) {
        return res.status(400).json({
            success: false,
            message: validationResult.error.errors[0].message,
            errors: 'Validation Error',
        });
    }
    try {
        const data = yield product_service_1.productsDB.updatedProductID(id, body);
        res.status(200).json({
            success: true,
            message: 'Product updated successfully!',
            data: data,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong!',
            error: error.message || 'Internal Server Error',
        });
    }
});
const deletedProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield product_service_1.productsDB.deleteProductID(id);
        res.status(200).json({
            success: true,
            message: 'Product deleted successfully!',
            data: null,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong!',
            error: error.message || 'Internal Server Error',
        });
    }
});
exports.productController = {
    createProduct,
    getAllProducts,
    getProductById,
    updatedProduct,
    deletedProduct,
};
