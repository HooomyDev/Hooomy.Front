import React from "react";
import styles from "./RadioButton.module.css";

export default function RadioButton({ value, label, checked, ...rest }) {
  return (
    <label className={styles.radioLabel}>
      <input
        type="radio"
        value={value}
        checked={checked}
        {...rest}
        className={styles.radioInput}
      />
      <span className={styles.radioText}>{label}</span>
    </label>
  );
}
