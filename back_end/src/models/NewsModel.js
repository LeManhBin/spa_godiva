import mongoose, { model } from "mongoose";

const {Schema} = mongoose;

const newsSchema = Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    }
},

{timestamps: true})

export const News = new model('news', newsSchema)