import React from "react";
import { useNavigate } from "react-router-dom";
import Snowfall from "react-snowfall";
import styles from "./NoAccess.module.css";

export default function NoAccess() {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <Snowfall color="#FFF" />
      <div className={styles.container}>
        <div className={styles.code}>403</div>
        <div className={styles.message}>
          Доступ запрещён <span className={styles.accent}>:(</span>
        </div>
        <div className={styles.description}>
          У вас нет прав для просмотра этой страницы. Обратитесь к
          администратору или войдите под другой учётной записью.
        </div>
        <button className={styles.button} onClick={() => navigate("/")}>
          На главную
        </button>
      </div>
    </div>
  );
}
