// RequestDetailsModal.jsx
import React from "react";
import styles from "./RequestDetailsModal.module.css";
import { format } from "date-fns";

import { useQuery } from "@tanstack/react-query";
import { getRequestDetails } from "../../../api/services/requestService";
import Loader from "../../../common/Loader/Loader";
import {
  CalendarIcon,
  MapPinIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import ImageGallery from "../../../common/ImageGallery/ImageGallery";

export default function RequestDetailsModal({ request }) {
  const STATUS_MAP = {
    1: { text: "Создан", icon: ClockIcon, color: "#1976d2" },
    2: { text: "Отклонено", icon: XCircleIcon, color: "#d32f2f" },
    3: { text: "В обработке", icon: ExclamationCircleIcon, color: "#f57c00" },
    4: { text: "Выполнено", icon: CheckCircleIcon, color: "#388e3c" },
  };

  const { data: requestDetails, isLoading } = useQuery({
    queryKey: ["request", request],
    queryFn: () => getRequestDetails(request.id),
  });

  if (isLoading) return <Loader />;

  const statusInfo = STATUS_MAP[requestDetails.status] || {
    text: "Неизвестный статус",
    icon: ExclamationCircleIcon,
    color: "#999",
  };
  const StatusIcon = statusInfo.icon;

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>Детали заявки</div>

      <div className={styles.content}>
        <div className={styles.photoWrapper}>
          <ImageGallery
            images={requestDetails.imagesUrls || []}
            baseUrl="http://localhost:5001"
            showThumbnails={true}
            thumbnailSize={80}
            mainHeight={450}
          />
        </div>

        {/* Информация о заявке */}
        <div className={styles.infoWrapper}>
          <div className={styles.reqTitle}>{requestDetails.title}</div>

          <div
            className={styles.reqStatus}
            style={{
              backgroundColor: `${statusInfo.color}15`,
              color: statusInfo.color,
            }}
          >
            <StatusIcon className={styles.statusIcon} />
            {statusInfo.text}
          </div>

          <div className={styles.reqDate}>
            <CalendarIcon className={styles.icon} />
            <span>
              Создано:{" "}
              {format(new Date(requestDetails.createdAt), "dd.MM.yyyy HH:mm")}
            </span>
          </div>

          <div className={styles.reqAddress}>
            <MapPinIcon className={styles.icon} />
            <span>
              <strong>Адрес:</strong> {requestDetails.address}
            </span>
          </div>

          <div className={styles.reqDescription}>
            <div className={styles.descriptionHeader}>
              <DocumentTextIcon className={styles.icon} />
              <span>Описание</span>
            </div>
            <p>{requestDetails.description || "Описание отсутствует"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
