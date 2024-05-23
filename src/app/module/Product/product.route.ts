import express from 'express';
import { productController } from './product.controller';

const router = express.Router();

router.post('/', productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.put('/:id', productController.updatedProduct);
router.delete('/:id', productController.deletedProduct);

export const productRoutes = router;
