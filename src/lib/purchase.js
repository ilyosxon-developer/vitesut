// import axios from "axios";

// // API bazaviy URL
// const API_BASE_URL = "https://milkbackend.pythonanywhere.com/";

// // Axios instance yaratish
// const axiosInstance = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Tokenni olish va har safar so‘rovga qo‘shish
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("access_token");
//     if (token) {
//       config.headers.Authorization = `JWT ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // 🔹  olish
// export const fetchBirliklar = () => axiosInstance.get("purchases/");

// export const fetchOmborlar = () => axiosInstance.get("omborlar/");

// // 🔹 Yangi  qo‘shish
// export const createPurchase  = (name) =>
//   axiosInstance.post("purchases/", { name });

// // 🔹  o‘chirish
// export const deleteBirlik = (id) => axiosInstance.delete(`purchases/${id}/`);

// // 🔹  tahrirlash
// export const updateBirlik = (id, name) =>
//   axiosInstance.patch(`purchases/${id}/`, { name });

// export default axiosInstance;
import axios from "axios";
import axiosInstance from "./axiosInstance"; // agar umumiy axios instance bo‘lsa

const API_BASE_URL = "https://milkbackend.pythonanywhere.com/purchases/";

// Xaridlarni olish
export const fetchPurchases = () => axiosInstance.get(API_BASE_URL);

// Yangi xarid qo‘shish
export const createPurchase = (purchaseData) =>
  axiosInstance.post(API_BASE_URL, purchaseData);

// Xaridni o‘chirish
export const deletePurchase = (id) =>
  axiosInstance.delete(`${API_BASE_URL}${id}/`);
export const fetchBirliklar = () => axiosInstance.get("purchases/");

export const fetchOmborlar = () => axiosInstance.get("omborlar/");

export const createBirliklar  = (name) =>
  axiosInstance.post("purchases/", { name });

// 🔹  o‘chirish
export const deleteBirliklar = (id) => axiosInstance.delete(`purchases/${id}/`);
deleteBirliklar
// 🔹  tahrirlash
export const updateBirliklar = (id, name) =>
  axiosInstance.patch(`purchases/${id}/`, { name });


export default { fetchBirliklar, createBirliklar, deleteBirliklar,updateBirliklar };
