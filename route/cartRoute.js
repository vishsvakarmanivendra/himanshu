import express from 'express';
import { addToCart, getUserCart, removeFromCart, updateCartQuantity } from '../controller/cartController.js';

const router = express.Router();

// Add item to cart
router.post('/add', addToCart);

// Get user's cart items
router.get('/:userId', getUserCart);

// Update cart item quantity
router.put('/update', updateCartQuantity);

// Remove item from cart
router.delete('/remove/:cartId', removeFromCart);

export default router;
