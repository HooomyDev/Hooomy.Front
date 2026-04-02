import React, { useState, useRef, useEffect } from "react";
import { useFormContext, Controller } from "react-hook-form";
import styles from "./AutocompleteField.module.css";
import Dropdown from "../Dropdown/Dropdown";

export default function AutocompleteField({
  label,
  name,
  options,
  required = false,
  rules = {},
  onSearch,
}) {
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
                placeholder="Введите что-нибудь..."
                onChange={(e) => {
                  const query = e.target.value;
                  setSearch(query);
                  if (query === "") {
                    onChange("");
                  }
                  setOpen(true);
                  if (onSearch) onSearch(query);
                }}
                onFocus={() => setOpen(true)}
              />

              {open && filteredOptions.length > 0 && (
                <Dropdown
                  visible={open}
                  items={filteredOptions.slice(0, 5).map((opt) => ({
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
