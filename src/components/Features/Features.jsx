import React from "react";
import styles from "./Features.module.css";

export default function Features({ items }) {
  return (
    <div className={styles.wrapper} id="features">
      <h2 className={styles.heading}>Преимущества</h2>
      <div className={styles.grid}>
        {items.map((item, index) => (
          <div key={index} className={styles.card}>
            <img src={item.icon} alt={item.title} className={styles.icon} />
            <h3 className={styles.title}>{item.title}</h3> {/* ✅ исправлено */}
            <p className={styles.description}>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
