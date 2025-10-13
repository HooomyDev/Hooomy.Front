import React from "react";
import styles from "./RadioButton.module.css";

export default function RadioButton({ value, checked, onChange, label }) {
  return (
    <label className={`${styles.radioLabel} ${checked ? styles.selected : ""}`}>
      <input
        type="radio"
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className={styles.radioInput}
      />
      <span className={styles.radioText}>{label}</span>
    </label>
  );
}
