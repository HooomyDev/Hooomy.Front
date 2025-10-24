import React from "react";
import styles from "./DropdownItem.module.css";

export default function DropdownItem({ label, onClick, icon: Icon }) {
  return (
    <li
      className={styles.item}
      onClick={onClick}
      role="menuitem"
      tabIndex={0}
      aria-label={label}
      onKeyDown={(e) => e.key === "Enter" && onClick?.()}
    >
      {Icon && <Icon className={styles.icon} />}
      <span className={styles.label}>{label}</span>
    </li>
  );
}
