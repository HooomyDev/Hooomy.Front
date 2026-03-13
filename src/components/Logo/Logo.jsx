import React from "react";
import { Link } from "react-router-dom";
import styles from "./Logo.module.css";
import { ReactComponent as LogoImage } from "../../assets/logo.svg";
import routes from "../../stores/routes.json";

export default function Logo() {
  return (
    <Link
      to={routes.home}
      className={styles.logoWrapper}
      aria-label="На главную"
    >
      <LogoImage className={styles.logoImage} />
    </Link>
  );
}
