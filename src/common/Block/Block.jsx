import React from "react";
import styles from "./Block.module.css";

export default function Block({ title, Icon, children }) {
  return (
    <div className={styles.block}>
      {title && (
        <div className={styles.title}>
          {Icon && <Icon className={styles.icon} />}
          <div>{title}</div>
        </div>
      )}

      <div className={styles.content}>{children}</div>
    </div>
  );
}
