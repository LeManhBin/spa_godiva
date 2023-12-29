import mongoose, { model } from "mongoose";
const {Schema} = mongoose;

const customerSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    message: {
        type: String,
    },
    status: {
        type: Number,
        required: true,
        default: 0
    }
},
{timestamps: true})

export const Customer = mongoose.model('customer', customerSchema)