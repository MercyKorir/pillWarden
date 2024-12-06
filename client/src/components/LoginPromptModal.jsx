import React, { useEffect, useState } from "react";
import styles from "../styles/LoginPromptModal.module.css";

const LoginPromptModal = ({ onLoginClick }) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    showModal && (
      <div className={styles.modalBox}>
        <span className={styles.closeBtn}>&times;</span>
        <h3 className={styles.modalTitle}>Login Required</h3>
        <p className={styles.modalText}>Please login to continue</p>
        <button
          type="button"
          onClick={onLoginClick}
          className={styles.modalBtn}
        >
          Log In
        </button>
        <div className={styles.timer}></div>
      </div>
    )
  );
};

export default LoginPromptModal;
