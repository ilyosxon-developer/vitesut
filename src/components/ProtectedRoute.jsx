// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { appConfig } from "@config";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem(appConfig.storage.ACCESS_TOKEN); // To'g'ri tokenni tekshirish
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
