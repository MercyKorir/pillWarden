import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/Header.module.css";

const Header = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>LOGO</div>
      <div className={styles.rightNav}>
        <nav className={styles.navContainer}>
          <ul>
            <li>
              <Link to={"/login"} className={styles.menuItem}>
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
        <button type="button" className={styles.authBtn} onClick={handleLogin}>
          Login
        </button>
      </div>
    </header>
  );
};

export default Header;
