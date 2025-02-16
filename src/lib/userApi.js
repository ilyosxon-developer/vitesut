// import axios from "axios";
// import axiosInstance from "./axiosInstance";
// const API_BASE_URL = "hhttps://milkbackend.pythonanywhere.com/";

// // 1. Barcha userlarni olish
// export const getUsers = async () => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/users/`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     throw error;
//   }
// };
// export const fetchUsers = () => axiosInstance.get("users/");

// // 2. Yangi user yaratish
// export const createUser = async (userData) => {
//   try {
//     const response = await axios.post(`${API_BASE_URL}/users/`, userData);
//     return response.data;
//   } catch (error) {
//     console.error("Error creating user:", error);
//     throw error;
//   }
// };

// // (qolgan kodni yuqoridagi koddan olish mumkin)
import axios from "axios";
import axiosInstance from "./axiosInstance";

const API_BASE_URL = "https://milkbackend.pythonanywhere.com/";

// 1. Barcha userlarni olish
export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
export const fetchUsers = () => axiosInstance.get("users/");

// 2. Yangi user yaratish
export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/`, userData);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

// 3. User turlarini olish (API bo'lmasa, qo'lda beriladi)
export const getUserTypes = async () => {
  return [
    { value: "admin", label: "Admin" },
    { value: "diller", label: "Diller" },
    { value: "klient", label: "Klient" },
  ];
};
