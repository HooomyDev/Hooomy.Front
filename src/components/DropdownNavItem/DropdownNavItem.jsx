import React, { useState, useRef, useEffect } from "react";
import styles from "./DropdownNavItem.module.css";
import { NavLink } from "react-router-dom";
import { ReactComponent as TrialgleImage } from "../../assets/triangle.svg";

export default function DropdownNavItem() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <button
        className={`${styles.dropdownToggle} ${open ? styles.open : ""}`}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="true"
      >
        Ещё
        <TrialgleImage className={styles.triangle} />
      </button>

      {open && (
        <div className={styles.dropdownMenu}>
          <NavLink to="/" className={styles.navLink}>
            Личный кабинет
          </NavLink>
          <NavLink to="/" className={styles.navLink}>
            Способы оплаты
          </NavLink>

          <div className={styles.separator} />

          <NavLink to="/" className={styles.navLink}>
            Документы
          </NavLink>
          <NavLink to="/" className={styles.navLink}>
            Недвижимость
          </NavLink>

          <div className={styles.separator} />

          <NavLink to="/" className={styles.navLink}>
            Отзывы
          </NavLink>
          <NavLink to="/" className={styles.navLink}>
            FAQ
          </NavLink>
        </div>
      )}
    </div>
  );
}
