import axios from "axios";
import api from "./interceptor";

const USER_AUTH_BASE_URL = process.env.REACT_APP_BACKEND_URL;

export const CreateUser = (data) =>
  axios.post(`${USER_AUTH_BASE_URL}/signUp`, data);
export const Login = (data) => axios.post(`${USER_AUTH_BASE_URL}/login`, data);
export const ResetPassword = (data) => axios.post(`${USER_AUTH_BASE_URL}/resetPassword`, data);

export const GetUserFromToken = () => api.get(`${USER_AUTH_BASE_URL}/getUserFromToken`);
export const GetUser = (id) => api.get(`${USER_AUTH_BASE_URL}/getUser/${id}`);
export const GetAllServiceProviders = () => api.get(`${USER_AUTH_BASE_URL}/getAllServiceProviders`);
export const GetNormalUsers = () => api.get(`${USER_AUTH_BASE_URL}/getAllNormalUsers`);
export const GetAllUsers = () => api.get(`${USER_AUTH_BASE_URL}/getAllUsers`);
export const UpdateUser = (id, data) => api.post(`${USER_AUTH_BASE_URL}/updateUser/${id}`, data);
export const DeleteUser = (id) => api.get(`${USER_AUTH_BASE_URL}/deleteUser/${id}`);
