import React from "react";
import styles from "./TabPanel.module.css";
import { NavLink } from "react-router-dom";

export default function TabPanel({
  icon: Icon,
  title,
  description,
  state,
  nodeRef,
}) {
  return (
    <div ref={nodeRef} className={`${styles.card} ${styles[`fade-${state}`]}`}>
      <Icon className={styles.icon} />
      <div>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <NavLink to="/register" className={styles.tryButton}>
          Попробовать
        </NavLink>
      </div>
    </div>
  );
}
