import React, { useState } from "react";
import styles from "./InputField.module.css";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function InputField({
  label,
  name,
  type = "text",
  required = false,
  value,
  onChange,
  error,
  multiline = false,
  rows = 4,
}) {
  const [visible, setVisible] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword ? (visible ? "text" : "password") : type;

  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor={name}>
        {label}
        {required && <span className={styles.required}> *</span>}
      </label>

      <div className={styles.inputWrapper}>
        {multiline ? (
          <textarea
            className={`${styles.inputField} ${error ? styles.inputError : ""}`}
            id={name}
            name={name}
            required={required}
            value={value}
            onChange={onChange}
            rows={rows}
          />
        ) : (
          <input
            className={`${styles.inputField} ${error ? styles.inputError : ""}`}
            id={name}
            name={name}
            type={inputType}
            required={required}
            value={value}
            onChange={onChange}
          />
        )}

        {isPassword && !multiline && (
          <button
            type="button"
            className={styles.eye}
            onClick={() => setVisible(!visible)}
            aria-label={visible ? "Скрыть пароль" : "Показать пароль"}
          >
            {visible ? (
              <EyeSlashIcon className={styles.icon} />
            ) : (
              <EyeIcon className={styles.icon} />
            )}
          </button>
        )}
      </div>

      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}
