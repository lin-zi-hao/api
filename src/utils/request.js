// 封装axios请求
import axios from 'axios';
export const baseUrl = "http://localhost:7760";
export const apiUrl =baseUrl+'/api';
const request = axios.create({
    baseURL: apiUrl,
    withCredentials: true
})

// request.get = function(url,data,config={}){
//     return request(url,{
//         params:{
//             ...config,
//             data
//         }
//     })
// }

export default request;