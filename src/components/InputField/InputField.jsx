import React from "react";
import styles from "./InputField.module.css";

export default function InputField({ 
    label, 
    name, 
    register, 
    error, 
    type = "text" 
}) {
  return (
    <div className={styles.inputField}>
      <label className={styles.label} htmlFor={name}>{label}</label>
      <input
        className={styles.input}
        id={name}
        type={type}
        {...register(name)}
      />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}