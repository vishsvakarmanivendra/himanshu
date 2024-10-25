import { DataTypes } from 'sequelize';
import sequelize from '../db/dbconection.js';
import User from './userModal.js';
import Service from './services.js';

const Cart = sequelize.define('Cart', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  serviceId: {
    type: DataTypes.INTEGER, // Replaced productId with serviceId
    allowNull: false,
    references: {
      model: Service, // Replacing Product with Service
      key: 'id'
    }
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: {
      min: 1
    }
  }
}, {
  tableName: 'cart',
  timestamps: true
});

// Relations
User.hasOne(Cart, { foreignKey: 'userId' });
Cart.belongsTo(User, { foreignKey: 'userId' });

Cart.hasMany(Service, { foreignKey: 'serviceId' }); // Updated to Service
Service.belongsTo(Cart, { foreignKey: 'serviceId' }); // Updated to Service

// Sync Cart Table
Cart.sync()
  .then(() => console.log("Cart table created successfully"))
  .catch(err => console.error("Failed to create Cart table:", err));

export default Cart;
