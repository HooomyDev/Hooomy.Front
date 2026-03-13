import React from "react";
import styles from "./LastCompleteRequestsItem.module.css";

export default function LastCompleteRequestsItem({ item }) {
  return (
    <div className={styles.card}>
      {item.photo_url ? (
        <img src={item.photo_url} alt={item.address} className={styles.image} />
      ) : (
        <div className={styles.placeholder}>Нет изображения</div>
      )}

      <div className={styles.content}>
        <div className={styles.title}>{item.address}</div>
        <div className={styles.status}>
          {item.status === "completed" ? "Выполнено" : item.status}
        </div>
        <div className={styles.date}>
          Создано: {new Date(item.date).toLocaleDateString("ru-RU")}
        </div>

        <div className={styles.extra}>
          <div className={styles.description}>Описание: {item.description}</div>
          <div className={styles.category}>Категория: {item.category}</div>
        </div>
      </div>
    </div>
  );
}
