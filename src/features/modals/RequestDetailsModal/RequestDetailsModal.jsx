import React from "react";
import styles from "./RequestDetailsModal.module.css";

export default function RequestDetailsModal({ request }) {
  if (!request) return;

  // id: 4,
  // title: "Заявка на ремонт",
  // status: "В обработке",
  // date: "2025-12-10",
  // district: "Фрунзенский",
  // street: "Пушкина",
  // house: "5",
  // entrance: "4",
  // floor: "9",
  // apartment: "90",
  // description: "Ремонт электрики",
  // photo: testImage,
  // location: { lat: 53.93, lng: 27.58 },

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>Детали заявки</div>

      <div className={styles.content}>
        <div className={styles.photoWrapper}>
          <img
            src={request.photo}
            alt={request.photo}
            className={styles.photo}
          />
        </div>

        <div className={styles.infoWrapper}>
          <div className={styles.reqTitle}>{request.title}</div>
          <div className={styles.reqStatus}>{request.status}</div>
          <div className={styles.reqDate}>Создано: {request.date}</div>
          <div className={styles.reqStatus}>
            <span>Район: {request.district}</span>
            <span>
              Улица: {request.street}, {request.house}, {request.apartment}
            </span>
          </div>
          <div className={styles.reqDescription}>{request.description}</div>
        </div>
      </div>
    </div>
  );
}
