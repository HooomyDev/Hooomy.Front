import React from "react";
import styles from "./LandingNavList.module.css";
import LandingNavItem from "../LandingNavItem/LandingNavItem";

export default function LandingNavList({ items, activeId }) {
  return (
    <ul className={styles.navList}>
      {items.map((item) => (
        <LandingNavItem
          key={item.to}
          item={item}
          isActive={activeId === item.to}
        />
      ))}
    </ul>
  );
}
