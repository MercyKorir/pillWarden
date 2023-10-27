import { useEffect } from "react";
import styles from "../styles/LoginPromptModal.module.css";

const LoginPromptModal = ({ onLoginClick, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h3 className={styles.modalTitle}>Login Required</h3>
        <p className={styles.modalDescription}>Please login to continue</p>
        <button
          type="button"
          onClick={onLoginClick}
          className={styles.modalBtn}
        >
          Log In
        </button>
      </div>
    </div>
  );
};

export default LoginPromptModal;
