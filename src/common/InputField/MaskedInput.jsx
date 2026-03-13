import React from "react";
import styles from "./InputField.module.css";
import { useFormContext, Controller } from "react-hook-form";
import { IMaskInput } from "react-imask";

export default function MaskedInputField({
  label,
  name,
  type = "text",
  required = false,
  rules = {},
  className,
  mask,
  placeholder,
}) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor={name}>
        {label}
        {required && <span className={styles.required}> *</span>}
      </label>

      <div className={styles.inputWrapper}>
        {mask && (
          <Controller
            name={name}
            control={control}
            rules={{ required, ...rules }}
            render={({ field }) => (
              <IMaskInput
                {...field}
                mask={mask}
                className={`${styles.inputField} ${className} ${
                  errors[name] ? styles.inputError : ""
                }`}
                placeholder={placeholder || mask}
                onAccept={(value) => field.onChange(value)}
              />
            )}
          />
        )}
      </div>

      {errors[name] && (
        <div className={styles.error}>{errors[name].message}</div>
      )}
    </div>
  );
}
