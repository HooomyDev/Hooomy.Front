import React from "react";
import styles from "./Header.module.css";
import Logo from "../Logo/Logo";
import AuthButton from "../AuthButton/AuthButton";

export default function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.wrapper}>
        <Logo />

        <div className={styles.actions}>
          <AuthButton />
        </div>
      </div>
    </div>
  );
}
