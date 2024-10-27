import { DataTypes } from "sequelize";
import sequelize from "../db/dbconection.js";

const Order = sequelize.define('Order', {
  userId: { type: DataTypes.INTEGER, allowNull: false },
  status: { type: DataTypes.STRING, defaultValue: 'pending' },
  totalAmount: { type: DataTypes.FLOAT, allowNull: false },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

const OrderItem = sequelize.define('OrderItem', {
  orderId: { type: DataTypes.INTEGER, allowNull: false },
  serviceId: { type: DataTypes.INTEGER, allowNull: false },
  quantity: { type: DataTypes.INTEGER, defaultValue: 1 },
  price: { type: DataTypes.FLOAT, allowNull: false },
});

Order.hasMany(OrderItem, { foreignKey: 'orderId' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

export {Order,OrderItem};