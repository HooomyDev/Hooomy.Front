import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavItem.module.css";

export default function NavItem({ item, onClick }) {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.to}
      className={({ isActive }) =>
        `${styles.navLink} ${isActive ? styles.activeLink : ""}`
      }
      onClick={() => {
        if (onClick) onClick();
      }}
      aria-label={item.label}
    >
      {Icon && <Icon className={styles.icon} />}
      <span className={styles.label}>{item.label}</span>
    </NavLink>
  );
}
