import React from "react";
import { useT } from "../../utils/useT";
import styles from "./ThemePicker.module.css";

export default function ThemePicker() {
  const t = useT();

  const changeTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>{t("settings.theme")}</div>
      <div className={styles.themes}>
        <button
          type="button"
          className={`${styles.theme} ${styles.light}`}
          onClick={() => changeTheme("light")}
        ></button>
        <button
          type="button"
          className={`${styles.theme} ${styles.dark}`}
          onClick={() => changeTheme("dark")}
        ></button>
        <button
          type="button"
          className={`${styles.theme} ${styles.red}`}
          onClick={() => changeTheme("red")}
        ></button>
        <button
          type="button"
          className={`${styles.theme} ${styles.blue}`}
          onClick={() => changeTheme("blue")}
        ></button>
        <button
          type="button"
          className={`${styles.theme} ${styles.green}`}
          onClick={() => changeTheme("green")}
        ></button>
      </div>
    </div>
  );
}
