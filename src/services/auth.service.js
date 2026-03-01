import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";
// const API_URL = "https://taskflow-pro-api-seven.vercel.app/api/auth";

export const registerUser = async (formData) => {
    const res = await axios.post(`${API_URL}/register`, formData);
    console.log("res", res);
    return res.data;
};

export const loginUser = async (formData) => {
    const res = await axios.post(`${API_URL}/login`, formData);
    return res.data;
};
