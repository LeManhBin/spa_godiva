import mongoose from "mongoose";
const {Schema} = mongoose;

const authSchema = new Schema({
    userName: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: Number,
        default: 1,
    },
},
{ timestamps: true }
)

export const Auth = mongoose.model('auth', authSchema);