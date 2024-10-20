// /models/Subcategory.js
import { DataTypes } from 'sequelize';
import sequelize from '../db/dbconection.js';
import Category from './categoryModal.js';

const Subcategory = sequelize.define('Subcategory', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  categoryId: {
    type: DataTypes.INTEGER,
    references: {
      model: Category,
      key: 'id',
    },
  },
}, {
  tableName: 'subcategories',
  timestamps: true,
});

Category.hasMany(Subcategory, { foreignKey: 'categoryId' });
Subcategory.belongsTo(Category, { foreignKey: 'categoryId' });
Subcategory.sync().then(res=>{
    console.log("all good")
    }).catch(err=>{
    console.log("not good")
    })
export default Subcategory;
