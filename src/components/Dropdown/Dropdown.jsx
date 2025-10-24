import React from "react";
import styles from "./Dropdown.module.css";
import DropdownItem from "../DropdownItem/DropdownItem";

export default function Dropdown({ items = [] }) {
  return (
    <ul className={styles.menu} role="menu">
      {items.map((item, index) => (
        <DropdownItem
          key={index}
          label={item.label}
          icon={item.icon}
          onClick={item.onClick}
        />
      ))}
    </ul>
  );
}
