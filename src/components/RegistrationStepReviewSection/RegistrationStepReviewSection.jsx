import React from "react";
import styles from "./RegistrationStepReviewSection.module.css";

export default function RegistrationStepReviewSection({ title, children }) {
  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      {children}
    </div>
  );
}
