import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import LoginPromptModal from "./LoginPromptModal";

const ProtectedRouteWrapper = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = Cookies.get("jwt");
        if (!token) return;

        const response = await axios.get(`http://localhost:5050/user/verify`, {
          headers: {Authorization: `Bearer ${token}`},
        });
        if (response.data.isAuthenticated) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Authentication check failed: ", error);
        setIsLoggedIn(false);
      }
    };

    checkAuth();
  }, []);

  const handleLoginClick = () => {
    navigate("/login");
  };
  return isLoggedIn ? (
    <>{children}</>
  ) : (
    <>
      <LoginPromptModal onLoginClick={handleLoginClick} />
    </>
  );
};

export default ProtectedRouteWrapper;
