import React, { useState, useRef, useEffect } from "react";
import styles from "./SelectField.module.css";
import Dropdown from "../Dropdown/Dropdown";

export default function SelectField({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
  error,
}) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (opt) => {
    onChange({ target: { name, value: opt.value } });
    setOpen(false);
    console.log(open);
  };

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <label className={styles.label} htmlFor={name}>
        {label}
        {required && <span className={styles.required}> *</span>}
      </label>

      <div className={styles.selectContainer}>
        <div
          className={`${styles.inputWrapper} ${open ? styles.open : ""}`}
          onClick={() => setOpen((prev) => !prev)}
        >
          <div
            className={`${styles.inputField} ${error ? styles.inputError : ""}`}
          >
            {options.find((o) => o.value === value)?.label || "Выберите..."}
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

      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}
