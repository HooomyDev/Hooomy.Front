import React from "react";
import styles from "./LandingNavItem.module.css";
import NavDot from "../NavDot/NavDot";

export default function NavItem({ item, isActive }) {
  return (
    <li className={`${styles.navItem} ${isActive ? styles.active : ""}`}>
      <NavDot to={item.to} label={item.label} isActive={isActive} />
    </li>
  );
}
