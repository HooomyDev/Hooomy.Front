import React from "react";
import styles from "./MainHeroTitle.module.css";
import { useT } from "../../utils/useT";

export default function MainHeroTitle() {
  const t = useT();
  return (
    <div className={styles.title}>
      Hooome<span className={styles.red}> ;)</span>
      <div className={styles.subtitle}>{t("main.hero")}</div>
    </div>
  );
}
