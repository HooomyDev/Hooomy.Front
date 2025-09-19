import React from "react";
import styles from "./Header.module.css";
import {ReactComponent as SunLogo} from '../../assets/sun.svg';
//import {ReactComponent as MoonLogo} from '../../assets/sun.svg';

export default function ThemeToggleButton() {
  const toggleTheme = () => {
    document.body.classList.toggle("dark");
  };

  return (
    <button className={styles.themeToggle} onClick={toggleTheme}>
      <SunLogo className="sunIcon"/>
    </button>
  );
}