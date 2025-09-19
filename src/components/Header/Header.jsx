import React from "react";
import styles from "./Header.module.css";
import Logo from "./Logo";
import ThemeToggleButton from "./ThemeToggleButton";
import AuthButton from "./AuthButton";

export default function Header() {
  return (
    <header className={styles.header}>
        <Logo className={styles.userLogo}/>

        <div className={styles.actions}>
            <ThemeToggleButton className={styles.themeToggle}/>
            <AuthButton className={styles.authButton}/>
        </div>
    </header>
  );
}