import { DataTypes } from "sequelize";
import sequelize from "../db/dbconection.js";
const Vendor = sequelize.define('User', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dob: {
        type: DataTypes.DATE,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false
    },
    otp: {
        type: DataTypes.STRING,
        allowNull: false
    },
    otpExpiry: {
        type: DataTypes.DATE,
        allowNull: false
    },
    image:{
        type:DataTypes.STRING,
        allowNull:false
    },
    adhar:{
        type:DataTypes.STRING,
        allowNull:false
    },
    professtion:{
        type:DataTypes.STRING,
        allowNull:false
    }
})

Vendor.sync().then(res=>{
console.log("all good")
}).catch(err=>{
console.log("not good")
})

export default Vendor;