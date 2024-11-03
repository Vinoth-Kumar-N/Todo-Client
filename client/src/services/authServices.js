import axios from 'axios';
import {getUserdata, removeUserdata} from './storageServices'

const API = "https://todo-server-3ahw.onrender.com/api";
// const API = "http://localhost:3300/api";

const registerUser = (data) => {
    return axios.post(`${API}/register`, data);
}
const loginUser = (data) => {
    return axios.post(`${API}/login`, data);
}

const isAuthenticated = () => {
    return getUserdata()  != null? true : false; 
}
 
const logout = () => {
    removeUserdata();
}

const AuthServices = {
    registerUser,
    loginUser,
    isAuthenticated,
    logout
}

export default AuthServices;