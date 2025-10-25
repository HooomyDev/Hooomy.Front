import React from "react";
import styles from "./MainHeroContent.module.css";

export default function MainHeroContent({ children }) {
  return <div className={styles.container}>{children}</div>;
}
