import React from "react";
import styles from "./RegistrationWizardButtons.module.css";

export default function RegistrationWizardButtons({
  onNext,
  onPrev,
  loading,
  disabledNext,
}) {
  return (
    <div className={styles.buttons}>
      <button
        type="button"
        onClick={onPrev}
        className={styles.prevStepButton}
        disabled={loading}
      >
        Назад
      </button>

      <button
        type="button"
        onClick={onNext}
        disabled={loading || disabledNext}
        className={`${styles.nextStepButton} ${loading ? styles.loading : ""}`}
      >
        {loading ? <span className={styles.spinner}></span> : "Далее"}
      </button>
    </div>
  );
}
