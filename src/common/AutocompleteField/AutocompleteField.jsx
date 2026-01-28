import React, { useState, useRef, useEffect } from "react";
import { useFormContext, Controller } from "react-hook-form";
import styles from "./AutocompleteField.module.css";
import Dropdown from "../Dropdown/Dropdown";
import { useT } from "../../utils/useT";

export default function AutocompleteField({
  label,
  name,
  options,
  required = false,
  rules = {},
}) {
  const t = useT();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
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

  // фильтрация по вводу
  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

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
            setSearch(opt.label);
            setOpen(false);
          };

          return (
            <div className={styles.autocompleteContainer}>
              <input
                id={name}
                name={name}
                className={`${styles.inputField} ${
                  errors[name] ? styles.inputError : ""
                }`}
                value={
                  search || options.find((o) => o.value === value)?.label || ""
                }
                placeholder={t("placeholder.selectField")}
                onChange={(e) => {
                  setSearch(e.target.value);
                  if (e.target.value === "") {
                    onChange("");
                  }
                  setOpen(true);
                }}
                onFocus={() => setOpen(true)}
              />

              {open && filteredOptions.length > 0 && (
                <Dropdown
                  visible={open}
                  items={filteredOptions.slice(0, 3).map((opt) => ({
                    label: opt.label,
                    onClick: () => handleSelect(opt),
                  }))}
                />
              )}
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
