import React from "react";
import styles from "../styles/AuthWrapper.module.css";

const AuthWrapper = ({ children }) => {
  return (
    <div className={styles.authContainer}>
      <div className={styles.formContainer}>
        <div className={styles.imageContainer}>
          <div className={styles.imgLogo}>
            <p>LOGO</p>
          </div>
        </div>
        <div className={styles.formWrapperContainer}>
          <div className={styles.formWrapper}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthWrapper;
