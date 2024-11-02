import axios from 'axios';
import {getUserdata, removeUserdata} from './storageServices'

const API = process.env.VITE_SERVER_API;

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