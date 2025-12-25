import React from "react";
import styles from "./RegistrationWizardButtons.module.css";
import { useT } from "../../../utils/useT";

export default function RegistrationWizardButtons({
  onNext,
  onPrev,
  loading,
  disabledNext,
}) {
  const t = useT();

  return (
    <div className={styles.buttons}>
      <button
        type="button"
        onClick={onPrev}
        className={styles.prevStepButton}
        disabled={loading}
      >
        {t("auth.prev")}
      </button>

      <button
        type="button"
        onClick={onNext}
        disabled={loading || disabledNext}
        className={`${styles.nextStepButton} ${loading ? styles.loading : ""}`}
      >
        {loading ? <span className={styles.spinner}></span> : t("auth.next2")}
      </button>
    </div>
  );
}
