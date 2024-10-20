import { DataTypes } from "sequelize";
import sequelize from "../db/dbconection.js";

const Vendor = sequelize.define('Vendor', {
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
        allowNull: false,
        unique: true // Ensure no duplicate emails
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        unique: true // Ensure phone numbers are unique (optional)
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
        allowNull: false,
        defaultValue:1234
    },
    otpExpiry: {
        type: DataTypes.DATE,
        allowNull:false,
        defaultValue: () => new Date(Date.now() + 15 * 60 * 1000)
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    adhar: {
        type: DataTypes.STRING,
        allowNull: false
    },
    profession: {
        type: DataTypes.STRING, // Fixed typo: 'professtion' to 'profession'
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('pending', 'approved', 'rejected'), // Status to track approval
        defaultValue: 'pending',
        allowNull: false
    }
});

Vendor.sync()
    .then(() => {
        console.log("Vendor table synced successfully.");
    })
    .catch(err => {
        console.error("Failed to sync Vendor table:", err);
    });

export default Vendor;
