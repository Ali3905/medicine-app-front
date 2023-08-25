import axios from 'axios';
import Cookies from "js-cookie"
//process.env.BACKEND_URL
//const baseURL = 
const axiosCliente = axios.create({
     // baseURL: process.env.REACT_APP_BASE_URL_LOCAL
     baseURL: "http://localhost:3000",
     headers: {
          "token" : Cookies.get("token")
     }
     

});


export default axiosCliente;