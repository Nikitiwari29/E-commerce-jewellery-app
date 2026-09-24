const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        items: [
            {
                productId: {
                    type: Number,
                    required: true,
                },
                name: {
                    type: String,
                    required: true,
                },
                price: {
                    type: Number,
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                },
                image: {
                    type: String,
                }
            }
        ],
        
        total: {
            type: Number,
            required: true
        },

        customerDetails: {
            name: {
                type: String,
                required: true,
            },
            phone: {
                type: String,
                required: true,
            },
            address: {
                type: String,
                required: true,
            },
            city: {
                type: String,
                required: true,
            },
            pincode: {
                type: String,
                required: true,
            },

        },

        PaymentMEthod: {
            type: String,
            default: "Cash on Delivery",

        },

        status: {
            type: String,
            dafault: "Order Placed",
        },

    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Order", orderSchema);