import React from "react";
import styles from "./RegistrationStepReviewField.module.css";

export default function RegistrationStepReviewField({ label, value }) {
  if (!value) return null;

  return (
    <div className={styles.field}>
      <span className={styles.label}>{label}:</span>
      <span className={styles.value}>{value}</span>
    </div>
  );
}
