import React, { useState } from "react";
import styles from "./InputField.module.css";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useFormContext } from "react-hook-form";

export default function InputField({
  label,
  name,
  type = "text",
  required = false,
  error,
  multiline = false,
  rows = 4,
  rules = {},
}) {
  const [visible, setVisible] = useState(false);
  const {
    register,
    formState: { errors },
  } = useFormContext();

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
            className={`${styles.inputField} ${
              errors[name] ? styles.inputError : ""
            }`}
            id={name}
            rows={rows}
            {...register(name, { required, ...rules })}
          />
        ) : (
          <input
            className={`${styles.inputField} ${
              errors[name] ? styles.inputError : ""
            }`}
            id={name}
            type={inputType}
            {...register(name, { required, ...rules })}
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

      {errors[name] && (
        <div className={styles.error}>{errors[name].message}</div>
      )}
    </div>
  );
}
