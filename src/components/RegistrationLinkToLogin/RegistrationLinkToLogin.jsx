import React from "react";
import styles from "./RegistrationLinkToLogin.module.css";
import { Link } from "react-router-dom";

export default function RegistrationLinkToLogin() {
  return (
    <div className={styles.text}>
      Уже есть аккаунт?{" "}
      <Link to="/login" className={styles.link}>
        Войти
      </Link>
    </div>
  );
}
