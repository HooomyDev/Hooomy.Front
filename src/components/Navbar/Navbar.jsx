import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import DropdownNavItem from "../DropdownNavItem/DropdownNavItem";
import NavItem from "../NavItem/NavItem";

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <DropdownNavItem />
    </div>
  );
}
