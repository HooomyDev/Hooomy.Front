import React, { useState, useRef, useEffect } from "react";
import { useFormContext, Controller } from "react-hook-form";
import Dropdown from "../Dropdown/Dropdown";
import styles from "./SelectField.module.css";

export default function SelectField({
  label,
  name,
  options,
  required = false,
  rules = {},
}) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  const {
    control,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <label className={styles.label} htmlFor={name}>
        {label}
        {required && <span className={styles.required}> *</span>}
      </label>

      <Controller
        name={name}
        control={control}
        rules={{ required, ...rules }}
        render={({ field: { value, onChange } }) => {
          const handleSelect = (opt) => {
            onChange(opt.value);
            setOpen(false);
          };

          return (
            <div className={styles.selectContainer}>
              <div
                className={`${styles.inputWrapper} ${open ? styles.open : ""}`}
                onClick={() => setOpen((prev) => !prev)}
              >
                <div
                  className={`${styles.inputField} ${
                    errors[name] ? styles.inputError : ""
                  }`}
                >
                  {options.find((o) => o.value === value)?.label ||
                    "Выберите..."}
                </div>
              </div>

              <Dropdown
                items={options.map((opt) => ({
                  label: opt.label,
                  onClick: () => handleSelect(opt),
                }))}
                visible={open}
              />
            </div>
          );
        }}
      />

      {errors[name] && (
        <div className={styles.error}>{errors[name].message}</div>
      )}
    </div>
  );
}
