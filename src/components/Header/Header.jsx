import React from "react";
import styles from "./Header.module.css";
import Logo from "../Logo/Logo";
import AuthButton from "../AuthButton/AuthButton";
import { useNavigate } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import routes from "../../stores/routes.json";

export default function Header() {
  const navigate = useNavigate();

  return (
    <div className={styles.header}>
      <div className={styles.wrapper}>
        <Logo />

        <div className={styles.actions}>
          <button
            className={styles.settingButton}
            onClick={() => navigate(routes.settings)}
          >
            <Cog6ToothIcon className={styles.icon} />
          </button>
          <AuthButton />
        </div>
      </div>
    </div>
  );
}
