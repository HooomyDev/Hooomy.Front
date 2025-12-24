import React from "react";
import styles from "./Dropdown.module.css";
import DropdownItem from "../DropdownItem/DropdownItem";

export default function Dropdown({ items = [], visible = false }) {
  return (
    <ul
      className={`${styles.menu} ${visible ? styles.menuVisible : ""}`}
      role="menu"
    >
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <div className={styles.separator} />}
          <DropdownItem
            label={item.label}
            icon={item.icon}
            onClick={item.onClick}
          />
        </React.Fragment>
      ))}
    </ul>
  );
}
