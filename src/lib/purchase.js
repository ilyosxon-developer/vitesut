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
      config.headers.Authorization = `JWT ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🔹  olish
export const fetchBirliklar = () => axiosInstance.get("purchases/");

export const fetchPurchaseOmbor = () => axiosInstance.get("omborlar/");

// 🔹 Yangi  qo‘shish
export const createPurchase  = (name) =>
  axiosInstance.post("purchases/", { name });

// 🔹  o‘chirish
export const deleteBirlik = (id) => axiosInstance.delete(`purchases/${id}/`);

// 🔹  tahrirlash
export const updateBirlik = (id, name) =>
  axiosInstance.patch(`purchases/${id}/`, { name });

export default axiosInstance;
