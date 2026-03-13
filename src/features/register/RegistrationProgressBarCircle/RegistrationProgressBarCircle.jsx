import React from "react";
import styles from "./RegistrationProgressBarCircle.module.css";

export default function RegistrationProgressBarCircle({ content, active }) {
  return (
    <div className={`${styles.circle} ${active ? styles.active : ""}`}>
      {content}
    </div>
  );
}
