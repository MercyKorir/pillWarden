import React, { useState } from "react";
import styles from '../styles/authForm.module.css';
import EmailIcon from "@mui/icons-material/Email";
import axios from "axios";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:5050/user/forgot-password', { email });
          setMessage(response.data.message);
          setError('');
        } catch (err) {
          setError(err.response?.data?.message || 'Error sending reset link');
          setMessage('');
        }
    };

    return (
        <div className={styles.loginForm}>
            <div>
                <p className={styles.formGreet}>Welcome Back!👋</p>
                <h2 className={styles.formTitle}>Forgot Password</h2>
            </div>
            <form onSubmit={handleForgotPassword}>
                <div className={styles.inputBox}>
                <span className={styles.icon}>
                    <div>
                    <EmailIcon />
                    </div>
                </span>
                <input
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label htmlFor="loginEmail">Email</label>
                <button type="submit" className={styles.formBtn}>
                    Send Reset Link
                </button>
                </div>
            </form>
            {message && <p style={{color: 'green'}}>{message}</p>}
            {error && <p style={{color: 'red'}}>{error}</p>}
        </div>
    );
}

export default ForgotPassword;