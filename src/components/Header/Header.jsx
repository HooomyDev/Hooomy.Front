import React from "react";
import styles from "./Header.module.css";
import Logo from "../Logo/Logo";
import ThemeToggleButton from "../ThemeToggleButton/ThemeToggleButton";
import AuthButton from "../AuthButton/AuthButton";

export default function Header() {
  return (
    <header className={styles.header}>
        <Logo className={styles.logo}/>

        <div className={styles.actions}>
            <ThemeToggleButton className={styles.themeToggle}/>
            <AuthButton className={styles.authButton}/>
        </div>
    </header>
  );
}