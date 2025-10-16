import React from "react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import styles from "./RegistrationStepSuccess.module.css";

export default function RegistrationStepSuccess() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.image}>
        <CheckCircleIcon className={styles.icon} />
      </div>
      <span className={styles.text}>Вы успешно зарегистрировались!</span>
    </div>
  );
}
