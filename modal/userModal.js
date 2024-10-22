import { DataTypes } from "sequelize";
import sequelize from "../db/dbconection.js";

const User = sequelize.define('User', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false // Required field
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false // Required field
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false, // Required field
        unique: true, // Ensure no duplicate emails
        validate: {
            isEmail: true // Ensure valid email format
        }
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false, // Required field
        unique: true // Ensure unique phone numbers
    },
    currentLocation: {
        type: DataTypes.STRING,
        allowNull: false // Required field
    },
    password: {
        type: DataTypes.STRING
    },
    userImage: {
        type: DataTypes.STRING
    }
});

User.sync()
    .then(() => {
        console.log("User table synced successfully.");
    })
    .catch((err) => {
        console.error("Failed to sync User table:", err);
    });

export default User;
