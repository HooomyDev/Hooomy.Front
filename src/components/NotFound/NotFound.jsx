import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NotFound.module.css";
import { Snowfall } from "react-snowfall";
import Button from "../../common/Button/Button";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
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
        <div className={styles.actions}>
          <Button
            variant="primary"
            className={styles.button}
            onClick={() => navigate("/")}
          >
            На главную
          </Button>
          <Button
            variant="secondary"
            className={styles.button}
            onClick={() => navigate(-1)}
          >
            Назад
          </Button>
        </div>
      </div>
    </div>
  );
}
