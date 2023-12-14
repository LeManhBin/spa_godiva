import axios from "axios";
import { BE_URL } from "../constants/url";

export const fetchGetAllStaff = async (payload) => {
    try {
        const data = await axios.get(`${BE_URL}/staff?page=${payload.queryKey[1]?.page}&limit=${payload.queryKey[1]?.limit}`)
        return data
    } catch (error) {
        console.log(error.message);
    }
}

export const fetchGetStaffById = async (id) => {
    try {
        const data = await axios.get(`${BE_URL}/staff/${id}`)
        return data
    } catch (error) {
        console.log(error.message);
    }
}

export const fetchCreateStaff = async (payload) => {
    try {
        const data = await axios.post(`${BE_URL}/staff`, payload, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        return data
    } catch (error) {
        console.log(error.message);
    }
}

export const fetchDeleteStaff = async (id) => {
    try {
        const data = await axios.delete(`${BE_URL}/staff/${id}`)
        return data
    } catch (error) {
        console.log(error.message);
    }
}