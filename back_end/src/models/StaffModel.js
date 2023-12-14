import mongoose from "mongoose";

const {Schema} = mongoose;

const staffSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true
    }
}, {timestamps: true})

export const Staff = new mongoose.model('staff', staffSchema)