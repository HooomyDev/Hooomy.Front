import React from "react";
import styles from "./MainHeroCTAButton.module.css";

export default function MainHeroCTAButton() {
  return (
    <button className={styles.ctaButton} aria-label="Создать новую заявку">
      Создать заявку
    </button>
  );
}
