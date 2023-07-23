// ProtectedRoute.js
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
const ProtectedRoute = () => {
  const AccessToken = localStorage.getItem("AccessToken");
  let isAuthenticated = !!AccessToken;

  return isAuthenticated ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
