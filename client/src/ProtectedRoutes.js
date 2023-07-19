// ProtectedRoute.js
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const userID = localStorage.getItem("userId");
  let bool;
  if (userID) {
    bool = true;
  } else {
    bool = false;
  }
  return bool ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
