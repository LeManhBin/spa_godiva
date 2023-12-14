import axios from "axios";
import { BE_URL} from '../constants/url';

export const fetchRegister = async ({payload}) => {
    try {
      const data = await axios.post(`${BE_URL}/auth/register`, payload) 
      return data
    } catch (error) {
        console.log(error.error);
    }
}

export const fetchLogin = async (formState) => {
    try {
      const data = await axios.post(`${BE_URL}/auth/login`, formState) 
      return data

    } catch (error) {
        console.log(error.error);
    }
}