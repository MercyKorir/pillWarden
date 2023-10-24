import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRouteWrapper = ({ children }) => {
  const token = Cookies.get("jwt");
  const isAuthenticated = !!token;

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

export default ProtectedRouteWrapper;
