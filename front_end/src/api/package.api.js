import axios from "axios";
import { BE_URL } from "../constants/url";

export const fetchGetAllPackage = async (payload) => {
    try {
       const data = await axios.get(`${BE_URL}/package?page=${payload.queryKey[1]?.page}&limit=${payload.queryKey[1]?.limit}`) 
       return data
    } catch (error) {
        console.log(error.message);
    }
}

export const fetchGetPackageById = async (id) => {
    try {
        const data = await axios.get(`${BE_URL}/package/${id}`) 
        return data
    } catch (error) {
        console.log(error.message);
    }
}

export const fetchCreatePackage = async (payload) => {
    try {
        const data = await axios.post(`${BE_URL}/package`, payload) 
        return data
    } catch (error) {
        console.log(error.message);
    }
}

export const fetchDeletePackage = async (id) => {
    try {
        const data = await axios.delete(`${BE_URL}/package/${id}`) 
        return data
    } catch (error) {
        console.log(error.message);
    }
}

export const fetchUpdatePackage = async ({idTerm, payload}) => {
    try {
        const data = await axios.put(`${BE_URL}/package/${idTerm}`, payload) 
        return data
    } catch (error) {
        console.log(error.message);
    }
}