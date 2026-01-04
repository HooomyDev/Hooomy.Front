import React, { useEffect, useState } from "react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";
import styles from "./DocScrollButton.module.css";

export default function DocScrollButton() {
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY === 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
