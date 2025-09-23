import React from "react";
import styles from "./FeaturesGrid.module.css";

export default function FeaturesGrid({ children }) {
  return <div className={styles.grid}>{children}</div>;
}
