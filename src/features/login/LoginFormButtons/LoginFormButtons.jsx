import React from "react";
import styles from "./LoginFormButtons.module.css";
import { useT } from "../../../utils/useT";
import Button from "../../../common/Button/Button";

export default function LoginFormButtons({
  loading = false,
  isNextDisabled = false,
  onPrev,
  onNext,
}) {
  const t = useT();

  return (
    <div className={styles.buttons}>
      <Button type="button" onClick={onPrev} variant="secondary">
        {t("auth.prev")}
      </Button>
      <Button
        className={`${styles.nextStepButton} ${loading ? styles.loading : ""}`}
        onClick={onNext}
        disabled={isNextDisabled}
      >
        {loading ? <span className={styles.spinner}></span> : t("auth.next1")}
      </Button>
    </div>
  );
}
