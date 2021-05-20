// 封装axios请求
import axios from 'axios';
export const baseUrl = "http://10.3.136.227:7760";
export const apiUrl =baseUrl+'/api';
const request = axios.create({
    baseURL: apiUrl,
    withCredentials: true
})

export default request;