import React from "react";
import styles from "./MainHeroCTAButton.module.css";

export default function MainHeroCTAButton({ onClick }) {
  return (
    <button
      className={styles.ctaButton}
      aria-label="Создать новую заявку"
      onClick={onClick}
    >
      Создать заявку
    </button>
  );
}
