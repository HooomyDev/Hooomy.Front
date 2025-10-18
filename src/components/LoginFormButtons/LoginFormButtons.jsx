import React from "react";
import styles from "./LoginFormButtons.module.css";

export default function LoginFormButtons({
  loading = false,
  isNextDisabled = false,
  onPrev,
  onNext,
}) {
  return (
    <div className={styles.buttons}>
      <button className={styles.prevStepButton} onClick={onPrev}>
        Назад
      </button>
      <button
        className={`${styles.nextStepButton} ${loading ? styles.loading : ""}`}
        onClick={onNext}
        disabled={isNextDisabled}
      >
        {loading ? <span className={styles.spinner}></span> : "Продолжить"}
      </button>
    </div>
  );
}
