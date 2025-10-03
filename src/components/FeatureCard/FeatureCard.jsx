import React from "react";
import styles from "./FeatureCard.module.css";
import { NavLink } from "react-router-dom";

export default function FeatureCard({ icon, title, description }) {
  return (
    <div className={styles.card}>
      <div className={styles.icon}>{icon}</div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      <NavLink to="/register" className={styles.tryButton}>
        Попробовать
      </NavLink>
    </div>
  );
}
