import React from "react";
import styles from "./RegistrationWizardContent.module.css";

export default function RegistrationWizardContent({ step }) {
  return <div className={styles.container}>{step.component}</div>;
}
