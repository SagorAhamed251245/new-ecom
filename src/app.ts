import express, { Application, Request, Response } from 'express';
import cors from 'cors';

import { productRoutes } from './app/modules/Product/product.route';
import { orderRoutes } from './app/modules/Order/order.route';
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});
// "Not Found" route middleware
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

export default app;
