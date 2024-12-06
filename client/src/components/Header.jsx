import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/Header.module.css";
import Cookies from 'js-cookie';
import axios from "axios";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = async () => {
    try {
      await axios.post(`http://localhost:5050/user/logout`);
      Cookies.remove("jwt");
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

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

  return (
    <header className={styles.header}>
      <div className={styles.logo}>LOGO</div>
      <div className={styles.rightNav}>
        <nav className={styles.navContainer}>
          <ul>
            <li>
              <Link to={"/"} className={styles.menuItem}>
                Home
              </Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link className={styles.menuItem}>Features</Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link className={styles.menuItem}>About</Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link className={styles.menuItem}>Connect</Link>
            </li>
          </ul>
        </nav>
        {isLoggedIn ? (
          <button type="button" className={styles.authBtn} onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <button type="button" className={styles.authBtn} onClick={handleLogin}>
            Login
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
