import axios from "axios";
import { BE_URL } from "../constants/url";

export const fetchGetAllNews = async (payload) => {
    try {
        const news = await axios.get(`${BE_URL}/news?page=${payload.queryKey[1]?.page}&limit=${payload.queryKey[1]?.limit}`)
        return news
    } catch (error) {
        console.log(error.message);
    }
}

export const fetchNewsById = async (id) => {
    try {
        const news = await axios.get(`${BE_URL}/news/${id}`)
        return news
    } catch (error) {
        console.log(error.message);
    }
}

export const fetchCreateNews = async (payload) => {
    try {
        const news = await axios.post(`${BE_URL}/news`, payload, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        return news
    } catch (error) {
        console.log(error.message);
    }
}
export const fetchDeleteNews = async (id) => {
    try {
        const news = await axios.delete(`${BE_URL}/news/${id}`)
        return news
    } catch (error) {
        console.log(error.message);
    }
}
export const fetchUpdateNews = async ({idTerm, formData}) => {
    try {
        const news = await axios.put(`${BE_URL}/news/${idTerm}`, formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        return news
    } catch (error) {
        console.log(error.message);
    }
}
