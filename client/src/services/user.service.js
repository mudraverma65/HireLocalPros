import axios from "axios";

// const USER_AUTH_BASE_URL = "https://csci-web-project.onrender.com";
const USER_AUTH_BASE_URL = "http://localhost:8000";
export const CreateUser = (data) =>
  axios.post(`${USER_AUTH_BASE_URL}/signUp`, data);
export const Login = (data) => axios.post(`${USER_AUTH_BASE_URL}/login`, data);
export const GetUser = (id) => axios.get(`${USER_AUTH_BASE_URL}/getUser/${id}`);
export const ResetPassword = (data) =>
  axios.post(`${USER_AUTH_BASE_URL}/resetPassword`, data);
