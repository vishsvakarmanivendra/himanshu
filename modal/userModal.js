import { DataTypes } from "sequelize";
import sequelize from "../db/dbconection.js";
const User = sequelize.define('User', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: true
    },
    dob: {
        type: DataTypes.DATE,
        allowNull: true
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
        allowNull: true
    },
    city: {
        type: DataTypes.STRING,
        allowNull: true
    },
    state: {
        type: DataTypes.STRING,
        allowNull: true
    },
    country: {
        type: DataTypes.STRING,
        allowNull: true
    },
    otp: {
        type: DataTypes.STRING,
        allowNull: true
    },
    otpExpiry: {
        type: DataTypes.DATE,
        allowNull: true
    },
    image:{
        type:DataTypes.STRING,
        allowNull:true
    }
})

User.sync().then(res=>{
console.log("all good")
}).catch(err=>{
console.log("not good")
})

export default User;