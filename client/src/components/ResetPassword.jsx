import React, {useState} from "react";
import axios from "axios";
import styles from "../styles/authForm.module.css";
import EmailIcon from "@mui/icons-material/Email";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useParams, Link } from "react-router-dom";

const ResetPassword = () => {
    const {token} = useParams();
    const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [showConfPwd, setShowConfPwd] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5050/user/reset-password', {
        token,
        newPassword
      });
      setMessage(response.data.message);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Error resetting password');
      setMessage('');
    }
  };

  return (
    <div className={styles.loginForm}>
      <div>
        <h2 className={styles.formTitle}>Reset Password</h2>
      </div>
      <form onSubmit={handleResetPassword}>
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
          name="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <label htmlFor="signUpPwd">Password</label>
        </div>
        <div className={styles.inputBox}>
        <span className={styles.icon}>
            <div onClick={() => setShowConfPwd(!showConfPwd)}>
              {showConfPwd ? (
                <VisibilityIcon style={{ cursor: "pointer" }} />
              ) : (
                <VisibilityOffIcon style={{ cursor: "pointer" }} />
              )}
            </div>
          </span>
        <input 
          type={showConfPwd ? "text" : "password"}
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <label htmlFor="confSignUpPwd">Confirm Password</label>
        </div>
        <button type="submit" className={styles.formBtn}>Reset Password</button>
        <div className={styles.loginRegister}>
          <p>
            <Link to={"/login"} className={styles.registerLink}>
              Login
            </Link>
          </p>
        </div>
      </form>
      {message && <p style={{color: 'green'}}>{message}</p>}
      {error && <p style={{color: 'red'}}>{error}</p>}
    </div>
  );
}

export default ResetPassword;