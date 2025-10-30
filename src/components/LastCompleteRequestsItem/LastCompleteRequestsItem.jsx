import React from "react";
import styles from "./LastCompleteRequestsItem.module.css";

export default function LastCompleteRequestsItem({ item }) {
  return (
    <div className={styles.card}>
      {item.image ? (
        <img src={item.image} alt={item.street} className={styles.image} />
      ) : (
        <div className={styles.placeholder}>Нет изображения</div>
      )}

      <div className={styles.content}>
        <h3 className={styles.title}>{item.street}</h3>
        <p className={styles.status}>
          {item.status === "completed" ? "Выполнено" : item.status}
        </p>
        <p className={styles.date}>
          {new Date(item.createdAt).toLocaleDateString("ru-RU")}
        </p>
      </div>
    </div>
  );
}
