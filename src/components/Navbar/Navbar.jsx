import React from "react";
import styles from "./Navbar.module.css";
import NavItem from "../NavItem/NavItem";

export default function Navbar({ items }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.navbar}>
        {items.map((item) => (
          <NavItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
