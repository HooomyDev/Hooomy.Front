import React from "react";
import styles from "./LoginFormButtons.module.css";
import { useT } from "../../../utils/useT";

export default function LoginFormButtons({
  loading = false,
  isNextDisabled = false,
  onPrev,
  onNext,
}) {
  const t = useT();

  return (
    <div className={styles.buttons}>
      <button type="button" className={styles.prevStepButton} onClick={onPrev}>
        {t("auth.prev")}
      </button>
      <button
        className={`${styles.nextStepButton} ${loading ? styles.loading : ""}`}
        onClick={onNext}
        disabled={isNextDisabled}
      >
        {loading ? <span className={styles.spinner}></span> : t("auth.next1")}
      </button>
    </div>
  );
}
