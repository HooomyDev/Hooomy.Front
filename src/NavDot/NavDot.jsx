import React from "react";
import styles from "./NavDot.module.css";

export default function NavDot({ to, label, isActive }) {
  return (
    <a
      href={`#${to}`}
      className={`${styles.navDot} ${isActive ? styles.active : ""}`}
    >
      <span className={styles.tooltip}>{label}</span>
    </a>
  );
}
