import React from "react";
import styles from "./InputField.module.css";

export default function InputField({
  label,
  name,
  type = "text",
  required = false,
  value,
  onChange,
}) {
  return (
    <div className={styles.inputField}>
      <label className={styles.label} htmlFor={name}>
        {label}
        {required && <span className={styles.required}> *</span>}
      </label>
      <input
        className={styles.input}
        id={name}
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
