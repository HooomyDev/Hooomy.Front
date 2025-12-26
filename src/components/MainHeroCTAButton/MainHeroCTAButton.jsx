import React from "react";
import styles from "./MainHeroCTAButton.module.css";
import { useT } from "../../utils/useT";

export default function MainHeroCTAButton({ onClick }) {
  const t = useT();

  return (
    <button className={styles.ctaButton} onClick={onClick}>
      {t("main.createRequest")}
    </button>
  );
}
