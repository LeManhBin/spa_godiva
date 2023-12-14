import mongoose from "mongoose";
const {Schema} = mongoose;

const mainBannerSchema = new Schema({
    image: {
        type: String,
    },
},
{ timestamps: true }
)

export const MainBanner = mongoose.model('main_banner', mainBannerSchema)