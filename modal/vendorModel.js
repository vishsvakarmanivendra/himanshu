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
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true // Ensure no duplicate emails
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true // Ensure phone numbers are unique
    },
    adhar: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true // Ensure unique Aadhaar numbers
    },
    currentLocation: {
        type: DataTypes.STRING,
        allowNull: false
    },
    categories: {
        type: DataTypes.JSON, // Store categories as a JSON array
        allowNull: false,
        validate: {
            isArray(value) {
                if (!Array.isArray(value)) {
                    throw new Error('Categories must be an array');
                }
                if (value.length < 1 || value.length > 3) {
                    throw new Error('Vendor must select at least 1 and at most 3 categories');
                }
            }
        }
    },
    workExperience: {
        type: DataTypes.INTEGER, // Storing work experience in years
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT, // Allows for a longer description
        allowNull: false
    },
    profilePhoto: {
        type: DataTypes.STRING, // Store URL/path to profile photo
        allowNull: false
    },
    serviceArea: {
        type: DataTypes.STRING, // Area where services are provided
        allowNull: false
    },
    toolsAvailable: {
        type: DataTypes.BOOLEAN, // Whether working tools are available or not
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    otp: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '1234'
    },
    otpExpiry: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: () => new Date(Date.now() + 15 * 60 * 1000)
    },
    status: {
        type: DataTypes.ENUM('pending', 'approved', 'rejected'), // Approval status
        defaultValue: 'pending',
        allowNull: false
    },
});

Vendor.sync()
  .then(() => {
    console.log("Vendor table created successfully.");
  })
  .catch((err) => {
    console.error("Failed to create Vendor table:", err);
  });

export default Vendor;
