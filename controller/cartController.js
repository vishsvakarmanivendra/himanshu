import Cart from "../modal/cart.js";
// Add item to cart
export const addToCart = async (req, res) => {
  try {
    const { userId, serviceId, quantity } = req.body;
    const cartItem = await Cart.create({ userId, serviceId, quantity });
    res.status(201).json({ message: "Item added to cart", cartItem });
  } catch (error) {
    res.status(500).json({ error: "Failed to add item to cart",s:error });
  }
};

// Get user's cart items
export const getUserCart = async (req, res) => {
  try {
    const userId = req.params.userId;
    const cartItems = await Cart.findAll({
      where: { userId },
    });
    res.status(200).json({ cartItems });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve cart items" });
  }
};

// Update cart item quantity
export const updateCartQuantity = async (req, res) => {
  try {
    const { cartId, quantity } = req.body;
    const cartItem = await Cart.findByPk(cartId);
    if (!cartItem) return res.status(404).json({ error: "Cart item not found" });
    cartItem.quantity = quantity;
    await cartItem.save();
    res.status(200).json({ message: "Cart item updated", cartItem });
  } catch (error) {
    res.status(500).json({ error: "Failed to update cart item" });
  }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
  try {
    const cartId = req.params.cartId;
    await Cart.destroy({ where: { id: cartId } });
    res.status(200).json({ message: "Item removed from cart" });
  } catch (error) {
    res.status(500).json({ error: "Failed to remove item from cart" });
  }
};
