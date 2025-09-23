import React, { useEffect, useState } from "react";
import styles from "./ThemToggleButton.module.css";
import {ReactComponent as SunLogo} from '../../assets/sun.svg';
import {ReactComponent as MoonLogo} from '../../assets/moon.svg';

export default function ThemeToggleButton() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light"? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <button className={styles.themeToggle} onClick={toggleTheme}>
        {theme === "light" ? (
          <SunLogo className={styles.sunIcon} />
        ) : (
          <MoonLogo className={styles.sunIcon} />
        )}
    </button>
  );
}