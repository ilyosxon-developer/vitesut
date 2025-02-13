// // birliklarApi.js
// import axios from "axios";

// const API_BASE_URL = "https://crmapimilk.pythonanywhere.com/birliklar/";

// // Tokenni olish funksiyasi (Har safar chaqirilganda yangilanadi)
// const getAuthHeaders = () => {
//   const token = localStorage.getItem("access_token");
//   return {
//     Authorization: `Bearer ${token}`, // Agar JWT prefiksi kerak bo‘lsa, `JWT ${token}` deb yozing
//     "Content-Type": "application/json",
//   };
// };

// // 🔹 Birliklarni olish
// export const fetchBirliklar = () => {
//   return axios.get(API_BASE_URL, { headers: getAuthHeaders() });
// };

// // 🔹 Yangi birlik qo‘shish
// export const createBirlik = (name) => {
//   return axios.post(API_BASE_URL, { name }, { headers: getAuthHeaders() });
// };

// // 🔹 Birlikni o‘chirish
// export const deleteBirlik = (id) => {
//   return axios.delete(`${API_BASE_URL}${id}/`, { headers: getAuthHeaders() });
// };

// // 🔹 Birlikni tahrirlash (faqat name maydoni)
// export const updateBirlik = (id, name) => {
//   return axios.patch(`${API_BASE_URL}${id}/`, { name }, { headers: getAuthHeaders() });
// };

import axios from "axios";

// API bazaviy URL
const API_BASE_URL = "https://crmapimilk.pythonanywhere.com/";

// Axios instance yaratish
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Tokenni olish va har safar so‘rovga qo‘shish
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🔹 Birliklarni olish
export const fetchBirliklar = () => axiosInstance.get("birliklar/");

// 🔹 Yangi birlik qo‘shish
export const createBirlik = (name) =>
  axiosInstance.post("birliklar/", { name });

// 🔹 Birlikni o‘chirish
export const deleteBirlik = (id) => axiosInstance.delete(`birliklar/${id}/`);

// 🔹 Birlikni tahrirlash
export const updateBirlik = (id, name) =>
  axiosInstance.patch(`birliklar/${id}/`, { name });

export default axiosInstance;
