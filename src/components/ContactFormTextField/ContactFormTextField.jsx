import React from "react";
import styles from "./ContactFormTextField.module.css";

export default function ContactFormTextField({
  title,
  placeholder,
  isRequired,
  name,
  type = "text",
  className,
}) {
  return (
    <div className={`${styles.container} ${className || ""}`}>
      <label htmlFor={name} className={styles.label}>
        {title} {isRequired && <span className={styles.required}>*</span>}
      </label>
      {type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          required={isRequired}
          className={styles.input}
        />
      ) : (
        <input
          type="text"
          id={name}
          name={name}
          placeholder={placeholder}
          required={isRequired}
          className={styles.input}
        />
      )}
    </div>
  );
}
