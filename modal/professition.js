import { DataTypes } from "sequelize";
import sequelize from "../db/dbconection";
const sequelize = new Sequelize()
const Peofasstion = sequelize.define('User', {
profasion:{
    type:DataTypes.STRING,
    allowNull:false
}
})

Peofasstion.sync().then(res=>{
console.log("all good")
}).catch(err=>{
console.log("not good")
})

export default Peofasstion;