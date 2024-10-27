import { Order } from "../modal/orderModal.js";
import { OrderItem } from "../modal/orderModal.js";
import Cart from "../modal/cart.js";
import CartItem from "../modal/cartItemModal.js";

export const placeOrderFromCart = async (req, res) => {
  try {
    const { userId } = req.body;

    const cart = await Cart.findOne({ where: { userId }, include: CartItem });

    if (!cart || cart.CartItems.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    let totalAmount = 0;
    const order = await Order.create({ userId, totalAmount, status: 'pending' });

    await Promise.all(cart.CartItems.map(async (cartItem) => {
      const service = await Service.findByPk(cartItem.serviceId);
      const itemTotal = service.price * cartItem.quantity;

      await OrderItem.create({
        orderId: order.id,
        serviceId: cartItem.serviceId,
        quantity: cartItem.quantity,
        price: service.price
      });

      totalAmount += itemTotal;
    }));

    order.totalAmount = totalAmount;
    await order.save();

    await CartItem.destroy({ where: { cartId: cart.id } });

    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (error) {
    res.status(500).json({ message: 'Failed to place order from cart', error });
  }
};

export const placeSingleItemOrder = async (req, res) => {
  try {
    const { userId, serviceId, quantity } = req.body;

    const service = await Service.findByPk(serviceId);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    const totalAmount = service.price * quantity;
    const order = await Order.create({ userId, totalAmount, status: 'pending' });

    await OrderItem.create({
      orderId: order.id,
      serviceId,
      quantity,
      price: service.price
    });

    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (error) {
    res.status(500).json({ message: 'Failed to place single item order', error });
  }
};
