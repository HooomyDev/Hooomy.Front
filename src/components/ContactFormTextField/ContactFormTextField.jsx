import React from "react";
import { useFormContext } from "react-hook-form";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid"; // импорт иконки
import styles from "./ContactFormTextField.module.css";

export default function ContactFormTextField({
  title,
  placeholder,
  isRequired,
  name,
  type = "text",
  className,
  validation = {},
}) {
  const {
    register,
    formState: { errors, isSubmitted },
  } = useFormContext();

  const errorMessage = isSubmitted ? errors[name]?.message : null;

  return (
    <div className={`${styles.container} ${className || ""}`}>
      <label htmlFor={name} className={styles.label}>
        {title} {isRequired && <span className={styles.required}>*</span>}
      </label>

      {type === "textarea" ? (
        <textarea
          id={name}
          placeholder={placeholder}
          className={`${styles.input} ${errorMessage ? styles.inputError : ""}`}
          {...register(name, {
            required: isRequired && "Пожалуйста, заполните это поле",
            ...validation,
          })}
        />
      ) : (
        <input
          type={type}
          id={name}
          placeholder={placeholder}
          className={`${styles.input} ${errorMessage ? styles.inputError : ""}`}
          {...register(name, {
            required: isRequired && "Пожалуйста, заполните это поле",
            ...validation,
          })}
        />
      )}

      {errorMessage && (
        <div className={styles.tooltip}>
          <ExclamationTriangleIcon className={styles.errorIcon} />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
}
