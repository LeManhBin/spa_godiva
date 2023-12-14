import axios from "axios";
import { BE_URL } from "../constants/url";

export const fetchGetBanner = async () => {
    try {
       const data = await axios.get(`${BE_URL}/main-banner`) 
       return data
    } catch (error) {
        console.log(error.message);
    }
}

export const fetchUpdateBanner = async (payload) => {
    try {
        const data = await axios.put(`${BE_URL}/main-banner/${payload.id}`, payload.formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }) 
        return data
    } catch (error) {
        console.log(error.message);
    }
}