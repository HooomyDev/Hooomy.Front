import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavItem.module.css";

export default function NavItem({ to, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${styles.navLink} ${isActive ? styles.activeLink : ""}`
      }
      aria-label={label}
    >
      {label}
    </NavLink>
  );
}
