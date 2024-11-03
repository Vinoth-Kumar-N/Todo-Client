import axios from 'axios';
import getUserDetails from '../utils/getUserDetails';

const API = "https://todo-server-3ahw.onrender.com/api";
// const API = "http://localhost:3300/api";

const authrHeader = () => {
    const userDetails = getUserDetails();
    const token = userDetails ? userDetails.token : null;
    if (!token) {
        console.error("Authorization token is missing. Please log in again.");
        return { headers: {} }; // Return empty headers if no token
    }
    return { headers: { 'Authorization': `Bearer ${token}` } };
};

const createTodo = (data) => {
    return axios.post(`${API}/todo/create-todo`, data, authrHeader());
};

const getAllToDos = (userId) => {
    return axios.get(`${API}/todo/get-all-todos/${userId}`, authrHeader());
};

const deleteToDo = (id) => {
    return axios.delete(`${API}/todo/delete-todo/${id}`, authrHeader());
};

const updateToDo = (id, data) => {
    return axios.patch(`${API}/todo/update-todo/${id}`, data, authrHeader());
};

const ToDoServices = {
    createTodo,
    getAllToDos,
    deleteToDo,
    updateToDo
};

export default ToDoServices;
