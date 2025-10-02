import React, { useEffect, useState } from "react";
import styles from "./ThemToggleButton.module.css";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

export default function ThemeToggleButton() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <button className={styles.themeToggle} onClick={toggleTheme}>
      {theme === "light" ? (
        <SunIcon className={styles.icon} />
      ) : (
        <MoonIcon className={styles.icon} />
      )}
    </button>
  );
}
