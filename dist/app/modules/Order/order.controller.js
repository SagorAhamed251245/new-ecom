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
exports.orderController = void 0;
const order_service_1 = require("./order.service");
const order_validation_1 = __importDefault(require("./order.validation"));
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    // Validate the request body using Zod
    const validationResult = order_validation_1.default.safeParse(body);
    if (!validationResult.success) {
        return res.status(400).json({
            success: false,
            message: validationResult.error.errors[0].message,
            errors: 'Validation Error',
        });
    }
    try {
        const result = yield order_service_1.OrderDB.createOrderDB(body);
        res.status(200).json({
            success: true,
            message: 'Order created successfully!',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Order is not created successfully!',
            error: error.message || 'Internal Server Error',
        });
    }
});
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.query;
    if (email) {
        try {
            const result = yield order_service_1.OrderDB.getAllOrdersFromDB(email);
            res.status(200).json({
                success: true,
                message: 'Orders fetched successfully for user email!',
                data: result,
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Order not found !',
                error: error.message || 'Internal Server Error',
            });
        }
    }
    else {
        try {
            const result = yield order_service_1.OrderDB.getAllOrdersFromDB(email);
            res.status(200).json({
                success: true,
                message: 'Orders fetched successfully!',
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
    }
});
exports.orderController = {
    createOrder,
    getAllOrders,
};
