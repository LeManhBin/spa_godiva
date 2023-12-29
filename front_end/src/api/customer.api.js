import axios from "axios";
import { BE_URL } from "../constants/url";

export const fetchGetAllCustomer = async (payload) => {
    try {
        const data = await axios.get(`${BE_URL}/customer?page=${payload.queryKey[1]?.page}&limit=${payload.queryKey[1]?.limit}`)
        return data
    } catch (error) {
        console.log(error.message);
    }
}

export const fetchGetCustomerById = async (id) => {
    try {
        const data = await axios.get(`${BE_URL}/customer/${id}`)
        return data
    } catch (error) {
        console.log(error.message);
    }
}

export const fetchRegisterCustomer = async (payload) => {
    try {
        const data = await axios.post(`${BE_URL}/customer` , payload)
        return data
    } catch (error) {
        console.log(error.message);
    }
}

export const fetchDeleteCustomer = async (id) => {
    try {
        const data = await axios.delete(`${BE_URL}/customer/${id}`)
        return data 
    } catch (error) {
        console.log(error.message);
    }
}