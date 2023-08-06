import axios from "axios";
import api from "./interceptor";

const USER_AUTH_BASE_URL = process.env.REACT_APP_BACKEND_URL;
// const USER_AUTH_BASE_URL = process.env.LOCAL_BACKEND_URL;

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
export const PostComment = (data) => axios.post(`${USER_AUTH_BASE_URL}/addReview`, data)
export const GetPostInformation = (id) => axios.get(`${USER_AUTH_BASE_URL}/userInformation/${id}`);

export const CategoryUser = (category) => api.get(`${USER_AUTH_BASE_URL}/category/${category}`);

export const CreateNotification = (data) => axios.post(`${USER_AUTH_BASE_URL}/createNotifications`, data);
export const GetNotifications = (id) => axios.get(`${USER_AUTH_BASE_URL}/getNotifications/${id}`);
export const DeleteNotification = (id) => axios.get(`${USER_AUTH_BASE_URL}/deleteNotification/${id}`);