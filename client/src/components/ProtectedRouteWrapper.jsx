import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import LoginPromptModal from "./LoginPromptModal";

const ProtectedRouteWrapper = ({ children }) => {
  const token = Cookies.get("jwt");
  const isAuthenticated = !!token;
  const [showModal, setShowModal] = useState(false);

  const handleLoginClick = () => {
    return <Navigate to="/login" />;
  };

  const closeModal = () => {
    setShowModal(false);
  };
  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <>
      {showModal && (
        <LoginPromptModal
          onLoginClick={handleLoginClick}
          onClose={closeModal}
        />
      )}
      <button onClick={() => setShowModal(true)}>Continue</button>
    </>
  );
};

export default ProtectedRouteWrapper;
