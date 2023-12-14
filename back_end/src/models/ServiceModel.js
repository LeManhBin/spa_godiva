import mongoose from "mongoose";
const {Schema} = mongoose;

const serviceSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    priceBeforeDiscount: {
        type: Number,
    },
    priceAfterDiscount: {
        type: Number,
    }
    },
    { timestamps: true }
)

export const Service = mongoose.model('service', serviceSchema)