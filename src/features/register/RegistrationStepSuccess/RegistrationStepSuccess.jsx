import React from "react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import styles from "./RegistrationStepSuccess.module.css";
import { useT } from "../../../utils/useT";

export default function RegistrationStepSuccess() {
  const t = useT();
  return (
    <div className={styles.wrapper}>
      <div className={styles.image}>
        <CheckCircleIcon className={styles.icon} />
      </div>
      <span className={styles.text}>{t("register.step5var1")}</span>
    </div>
  );
}
