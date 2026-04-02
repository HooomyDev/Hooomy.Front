import React from "react";
import styles from "./RegistrationWizardButtons.module.css";
import { useT } from "../../../utils/useT";
import Button from "../../../common/Button/Button";

export default function RegistrationWizardButtons({
  onNext,
  onPrev,
  loading,
  disabledNext,
}) {
  const t = useT();

  return (
    <div className={styles.buttons}>
      <Button
        type="button"
        onClick={onPrev}
        variant="secondary"
        disabled={loading}
        className={styles.button}
      >
        {t("auth.prev")}
      </Button>

      <Button
        type="button"
        onClick={onNext}
        disabled={loading || disabledNext}
        className={`${styles.button} ${loading ? styles.loading : ""}`}
      >
        {loading ? <span className={styles.spinner}></span> : t("auth.next2")}
      </Button>
    </div>
  );
}
