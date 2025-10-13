import React from "react";
import styles from "./RegistrationWizardButtons.module.css";

export default function RegistrationWizardButtons({
  onNext,
  onPrev,
  isNextDisabled = false,
  isPrevDisabled = false,
  loading = false,
}) {
  return (
    <div className={styles.buttons}>
      <button
        className={styles.prevStepButton}
        onClick={onPrev}
        disabled={isPrevDisabled}
      >
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
