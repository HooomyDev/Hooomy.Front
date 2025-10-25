import React from "react";
import styles from "./MainHeroTitle.module.css";

export default function MainHeroTitle() {
  return (
    <div className={styles.title}>
      Hooome<span className={styles.red}> ;)</span>
      <div className={styles.subtitle}>Портал городского хозяйства</div>
    </div>
  );
}
