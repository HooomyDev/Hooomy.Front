import React from "react";
import styles from "./RegistrationProgressBar.module.css";
import RegistrationProgressBarCircle from "../RegistrationProgressBarCircle/RegistrationProgressBarCircle";

export default function RegistrationProgressBar({ totalSteps, activeStep }) {
  const numbers = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <div className={styles.container}>
      {numbers.map((num) => (
        <div key={num} className={styles.stepWrapper}>
          <RegistrationProgressBarCircle
            content={num}
            active={activeStep === num}
          />
        </div>
      ))}
    </div>
  );
}
