import React from "react";
import styles from "./DateField.module.css";
import { useFormContext } from "react-hook-form";

export default function DateField({
  label,
  name,
  required,
  type = "date",
  rules = {},
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = errors[name];

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
          type={type}
          {...register(name, rules)}
          className={`${styles.inputField} ${error ? styles.error : ""}`}
        />
        {error && <span className={styles.errorMessage}>{error.message}</span>}
      </div>
    </div>
  );
}
