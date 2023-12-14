import mongoose from "mongoose";
const {Schema} = mongoose;

const servicePackageSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required:  true
    },
    description: {
        type: Array,
    }
},
{timestamps: true});

export const Package = new mongoose.model('package', servicePackageSchema)