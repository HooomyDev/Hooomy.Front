import React from "react";
import styles from "./CheckBox.module.css";

export default function CheckBox({ value, label, checked, ...rest }) {
  return (
    <label
      className={`${styles.checkBoxLabel} ${
        checked && styles.checkBoxLabelCheck
      }`}
    >
      <input
        type="checkbox"
        value={value}
        checked={checked}
        {...rest}
        className={styles.checkBoxInput}
      />
      <span className={styles.checkBoxText}>{label}</span>
    </label>
  );
}
