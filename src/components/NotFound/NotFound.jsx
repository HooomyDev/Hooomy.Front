import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NotFound.module.css";
import PageWrapper from "../../common/PageWrapper/PageWrapper";
import { Snowfall } from "react-snowfall";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <Snowfall color="#FFF" />
      <div className={styles.container}>
        <div className={styles.code}>404</div>
        <div className={styles.message}>
          Страница не найдена <span className={styles.accent}>:(</span>
        </div>
        <div className={styles.description}>
          Страница, которую вы ищете, могла быть удалена, переименована или
          временно недоступна.
        </div>
        <button className={styles.button} onClick={() => navigate("/")}>
          На главную
        </button>
      </div>
    </PageWrapper>
  );
}
