import React from "react";
import styles from "./AuthPage.module.css";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <h2 className={styles.title}>Вход</h2>
        Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
        <div className={styles.formFooter}>© Hooomy | Все права защищены</div>
      </div>
    </div>
  );
}
