import React from "react";
import styles from "./Header.module.css";
import Logo from "../Logo/Logo";
import ThemeToggleButton from "../ThemeToggleButton/ThemeToggleButton";
import AuthButton from "../AuthButton/AuthButton";

export default function Header() {
  return (
    <div className={styles.header}>
      <Logo />

      <div className={styles.actions}>
        <ThemeToggleButton />
        <AuthButton />
      </div>
    </div>
  );
}
