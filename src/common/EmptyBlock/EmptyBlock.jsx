import React from "react";
import styles from "./EmptyBlock.module.css";

export default function EmptyBlock({ children, Icon }) {
  return (
    <div className={styles.empty}>
      {Icon && <Icon className={styles.icon} />}
      {children}
    </div>
  );
}
