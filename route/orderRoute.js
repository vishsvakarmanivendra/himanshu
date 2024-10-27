import express from 'express';
import { placeOrderFromCart, placeSingleItemOrder } from '../controller/orderController.js';

const router = express.Router();

router.post('/order/cart', placeOrderFromCart);    
router.post('/order/single', placeSingleItemOrder);

export default router;
