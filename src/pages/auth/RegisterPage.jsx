import React from "react";
import RegistrationWizard from "../../components/RegistrationWizard/RegistrationWizard";
import styles from "./AuthPage.module.css";

export default function RegisterPage() {
  return (
    <div className={styles.pageWrapper}>
      <RegistrationWizard />
    </div>
  );
}
