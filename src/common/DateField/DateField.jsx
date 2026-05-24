import React from "react";
import styles from "./DateField.module.css";
import { useFormContext } from "react-hook-form";

export default function DateField({ label, name, required }) {
  const { register } = useFormContext();
  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={name} className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <div className={styles.inputWrapper}>
        <input
          id={name}
          type="date"
          {...register(name)}
          className={styles.inputField}
        />
      </div>
    </div>
  );
}
