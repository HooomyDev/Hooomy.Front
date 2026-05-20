import React from "react";
import styles from "./LinkTo.module.css";
import { Link } from "react-router-dom";

export default function LinkTo({ link, text, label }) {
  return (
    <div className={styles.text}>
      {text !== null && text}{" "}
      <Link to={link} className={styles.link}>
        {label}
      </Link>
    </div>
  );
}
