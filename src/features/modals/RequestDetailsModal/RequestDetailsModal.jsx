import React, { useEffect, useState } from "react";
import styles from "./RequestDetailsModal.module.css";
import { getRequestDetails } from "../../../api/services/requestService";
import Loader from "../../../common/Loader/Loader";
import { format } from "date-fns";
import { PhotoIcon } from "@heroicons/react/24/outline";

export default function RequestDetailsModal({ request }) {
  const [requestDetails, setRequestDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const STATUS_MAP = {
    1: "Создан",
    2: "Отклонено",
    3: "В обработке",
    4: "Выполнено",
  };

  useEffect(() => {
    async function fetchRequestDetails() {
      try {
        setLoading(true);
        const data = await getRequestDetails(request.id);
        setRequestDetails(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchRequestDetails();
  }, [request.id]);

  if (!requestDetails) return;
  if (loading) return <Loader />;

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>Детали заявки</div>
      <div className={styles.content}>
        <div className={styles.photoWrapper}>
          {requestDetails.photoUrl !== "" ? (
            <img
              src={requestDetails.photoUrl}
              alt={requestDetails.photoUrl}
              className={styles.photo}
            />
          ) : (
            <PhotoIcon className={styles.icon} />
          )}
        </div>

        <div className={styles.infoWrapper}>
          <div className={styles.reqTitle}>{requestDetails.title}</div>
          <div className={styles.reqStatus}>
            {STATUS_MAP[requestDetails.status] || "Неизвестный статус"}
          </div>
          <div className={styles.reqDate}>
            Создано:{" "}
            {format(new Date(requestDetails.createdAt), "dd.MM.yyyy HH:mm")}
          </div>
          <div className={styles.reqAddress}>{requestDetails.address}</div>
          <div className={styles.reqDescription}>
            {requestDetails.description}
          </div>
        </div>
      </div>
    </div>
  );
}
