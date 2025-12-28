import React from "react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";
import styles from "./DocScrollButton.module.css";

export default function DocScrollButton({ isAtTop }) {
  const handleClick = () => {
    if (!isAtTop) {
      window.scrollTo({ top: 0 });
    } else {
      const element = document.getElementById("general");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <button onClick={handleClick} className={styles.toTopButton}>
      <ChevronUpIcon
        className={`${styles.icon} ${!isAtTop ? styles.down : styles.up}`}
      />
    </button>
  );
}
