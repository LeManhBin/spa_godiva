import axios from "axios";
import { BE_URL } from "../constants/url";

export const fetchGetAllService = async (payload) => {
    try {
        const server = await axios.get(`${BE_URL}/service?page=${payload.queryKey[1]?.page}&limit=${payload.queryKey[1]?.limit}`)
        return server
    } catch (error) {
        console.log(error.message);
    }
}

export const fetchGetServiceById = async (id) => {
    try {
        const server = await axios.get(`${BE_URL}/service/${id}`)
        return server
    } catch (error) {
        console.log(error.message);
    }
}

export const fetchCreateService = async (payload) => {
    try {
        const server = await axios.post(`${BE_URL}/service`, payload)
        return server
    } catch (error) {
        console.log(error.message);
    }
}

export const fetchDeleteService = async (id) => {
    try {
        const server = await axios.delete(`${BE_URL}/service/${id}`)
        return server
    } catch (error) {
        console.log(error.message);
    }
}

export const fetchUpdateService = async ({idTerm, serviceState}) => {
    try {
        const server = await axios.put(`${BE_URL}/service/${idTerm}`, serviceState)
        return server
    } catch (error) {
        console.log(error.message);
    }
}