import axios from "axios";

const API_BASE_URL = "https://crmapimilk.pythonanywhere.com";

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

// (qolgan kodni yuqoridagi koddan olish mumkin)
