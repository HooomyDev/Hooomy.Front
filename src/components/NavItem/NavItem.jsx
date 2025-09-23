import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavItem.module.css";

export default function NavItem({ to, label, isActive, type }) {
  const className = `${styles.navLink} ${isActive ? styles.activeLink : ""}`;

  if (type === "route") {
    return (
      <div className={styles.navItem}>
        <NavLink to={to} className={className} aria-label={label}>
          {label}
        </NavLink>
      </div>
    );
  }

  if (type === "anchor") {
    return (
      <div className={styles.navItem}>
        <a href={to} className={className} aria-label={label}>
          {label}
        </a>
      </div>
    );
  }

  return null;
}
