import React from "react";
import styles from "./DocWrapper.module.css";

export default function DocWrapper({ children }) {
  return <div className={styles.wrapper}>{children}</div>;
}
