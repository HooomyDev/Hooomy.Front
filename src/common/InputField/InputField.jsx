import React, { useState } from "react";
import styles from "./InputField.module.css";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useFormContext } from "react-hook-form";

export default function InputField({
  label,
  name,
  type = "text",
  required = false,
  multiline = false,
  placeholder = "",
  rows = 4,
  rules = {},
  className,
  maxLength,
}) {
  const [visible, setVisible] = useState(false);
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const isPassword = type === "password";
  const inputType = isPassword ? (visible ? "text" : "password") : type;

  const currentValue = watch(name) || "";
  const currentLength = currentValue.length;

  const registerOptions = { required, ...rules };
  if (maxLength) {
    registerOptions.maxLength = {
      value: maxLength,
      message: `Максимум ${maxLength} символов`,
    };
  }

  return (
    <div className={styles.wrapper}>
      {label && (
        <label className={styles.label} htmlFor={name}>
          {label}
          {required && <span className={styles.required}> *</span>}
        </label>
      )}

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
            className={`${styles.inputField} ${className} ${
              errors[name] ? styles.inputError : ""
            }`}
            id={name}
            type={inputType}
            placeholder={placeholder}
            {...register(name, { required, ...rules })}
            onKeyDown={(e) => {
              if (type === "number" && required) {
                const allowed = [
                  "Backspace",
                  "Tab",
                  "ArrowLeft",
                  "ArrowRight",
                  "Delete",
                ];
                const isDigit = /^[0-9]$/.test(e.key);
                if (!isDigit && !allowed.includes(e.key)) {
                  e.preventDefault();
                }
              }
            }}
          />
        )}

        {isPassword && !multiline && (
          <button
            type="button"
            className={styles.eye}
            onClick={() => setVisible(!visible)}
          >
            {visible ? (
              <EyeSlashIcon className={styles.icon} />
            ) : (
              <EyeIcon className={styles.icon} />
            )}
          </button>
        )}
      </div>

      {maxLength && (
        <div
          className={`${styles.counter} ${
            errors[name] ? styles.counterError : ""
          }`}
        >
          <span className={currentLength > maxLength ? styles.exceeded : ""}>
            {currentLength}
          </span>
          <span>/{maxLength}</span>
        </div>
      )}

      {errors[name] && (
        <div className={styles.error}>{errors[name].message}</div>
      )}
    </div>
  );
}
