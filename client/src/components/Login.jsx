import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Login.module.css";
import EmailIcon from "@mui/icons-material/Email";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [showPwd, setShowPwd] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className={styles.loginForm}>
      <div>
        <p className={styles.formGreet}>Welcome Back!👋</p>
        <h2 className={styles.formTitle}>Login</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputBox}>
          <span className={styles.icon}>
            <div>
              <EmailIcon />
            </div>
          </span>
          <input
            type="email"
            id="loginEmail"
            name="email"
            autoComplete="email"
            value={loginData.email}
            onChange={handleChange}
            required
          />
          <label htmlFor="loginEmail">Email</label>
        </div>
        <div className={styles.inputBox}>
          <span className={styles.icon}>
            <div onClick={() => setShowPwd(!showPwd)}>
              {showPwd ? (
                <VisibilityIcon style={{ cursor: "pointer" }} />
              ) : (
                <VisibilityOffIcon style={{ cursor: "pointer" }} />
              )}
            </div>
          </span>
          <input
            type={showPwd ? "text" : "password"}
            id="loginPwd"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            required
          />
          <label htmlFor="loginPwd">Password</label>
        </div>
        <div className={styles.forgotPwd}>
          <Link to={"/forgot-password"} className={styles.forgotLink}>
            Forgot Password?
          </Link>
        </div>
        <button type="submit" className={styles.formBtn}>
          Login
        </button>
        <div className={styles.loginRegister}>
          <p>
            Don't have an account?{" "}
            <Link to={"/register"} className={styles.registerLink}>
              Register
            </Link>
          </p>
        </div>
        <p>{message}</p>
      </form>
    </div>
  );
};

export default Login;
