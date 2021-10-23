import axios from "axios"

export const axiosInstance = axios.create({
    baseURL : "https://midhatblog.herokuapp.com/api/"
})