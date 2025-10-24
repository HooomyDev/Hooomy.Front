import React from "react";
import styles from "./Navbar.module.css";
import DropdownNavItem from "../DropdownNavItem/DropdownNavItem";

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <DropdownNavItem />
    </div>
  );
}
