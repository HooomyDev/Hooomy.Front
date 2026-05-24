import React from "react";
import styles from "./EmployeeRequestsTable.module.css";
import {
  EyeIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  PlayCircleIcon,
} from "@heroicons/react/24/solid";
import { useT } from "../../utils/useT";

export default function EmployeeRequestsTable({
  requests = [],
  onSelectRequest,
  onStatusChange,
  getStatusColor,
}) {
  const t = useT();

  const categoryMap = {
    0: "Все",
    1: "Водоснабжение. Горячая вода",
    2: "Электроснабжение",
    3: "Бытовые услуги",
    4: "Санитарное состояние многоквартирного дома",
    5: "Отопление",
    6: "Благоустройство территории",
    7: "Водоснабжение",
    8: "Общестроительные работы",
    9: "Санитарное состояние территории",
    11: "Техническое обслуживание ЗПУ",
    12: "Техническое обслуживание лифта",
    13: "Обращение с ТКО",
    14: "Водоснабжение. Холодная вода",
    15: "Канализация",
    16: "Автомобильные дороги, тротуары",
    17: "Кровельные работы",
    18: "Уличное освещение",
    19: "Общественные места (Парки, скверы)",
    20: "Работы по ремонту стыков",
    21: "Техническое обслуживание зданий и сооружений",
    22: "Рекламные и информационные конструкции и объявления",
  };

  const statusMap = {
    0: { label: "Неизвестно", icon: null },
    1: { label: "Неизвестно", icon: null },
    2: { label: "Новое", icon: <ClockIcon className={styles.statusIcon} /> },
    3: {
      label: "Отклонено",
      icon: <XCircleIcon className={styles.statusIcon} />,
    },
    4: {
      label: "В обработке",
      icon: <ClockIcon className={styles.statusIcon} />,
    },
    5: {
      label: "Выполнено",
      icon: <CheckCircleIcon className={styles.statusIcon} />,
    },
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  if (requests.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>{t("employeeRequestsTable.empty")}</p>
      </div>
    );
  }

  return (
    <div className={styles.requestsTable}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>{t("employeeRequestsTable.headers.id")}</th>
            <th>{t("employeeRequestsTable.headers.title")}</th>
            <th>{t("employeeRequestsTable.headers.address")}</th>
            <th>{t("employeeRequestsTable.headers.date")}</th>
            <th>Категория</th>
            <th>{t("employeeRequestsTable.headers.status")}</th>
            <th>{t("employeeRequestsTable.headers.actions")}</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => {
            const statusInfo = statusMap[request.status] || statusMap[0];
            return (
              <tr key={request.id} className={styles.requestRow}>
                <td className={styles.idCell}>#{request.id}</td>
                <td>
                  <div className={styles.requestInfo}>
                    <strong className={styles.requestTitle}>
                      {request.title}
                    </strong>
                    <p className={styles.requestDescription}>
                      {request.description}
                    </p>
                  </div>
                </td>
                <td>
                  <div className={styles.addressInfo}>{request.address}</div>
                </td>
                <td className={styles.dateCell}>
                  <div className={styles.dateInfo}>
                    <ClockIcon className={styles.dateIcon} />
                    <span>{formatDate(request.createdAt)}</span>
                  </div>
                </td>
                <td>
                  <div className={styles.category}>
                    {categoryMap[request.category]}
                  </div>
                </td>
                <td>
                  <span
                    className={styles.statusBadge}
                    style={{
                      backgroundColor: getStatusColor(request.status),
                    }}
                  >
                    {statusInfo.icon}
                    <span>{statusInfo.label}</span>
                  </span>
                </td>
                <td>
                  <div className={styles.actions}>
                    <button
                      className={`${styles.actionButton} ${styles.viewButton}`}
                      onClick={() => onSelectRequest(request)}
                      title={t("employeeRequestsTable.actions.view")}
                    >
                      <EyeIcon className={styles.actionIcon} />
                    </button>

                    {request.status === 2 && (
                      <button
                        className={`${styles.actionButton} ${styles.inProgressButton}`}
                        onClick={() =>
                          onStatusChange({ ...request, status: 4 })
                        }
                        title="Взять в работу"
                      >
                        <PlayCircleIcon className={styles.actionIcon} />
                      </button>
                    )}

                    {request.status === 4 && (
                      <>
                        <button
                          className={`${styles.actionButton} ${styles.completeButton}`}
                          onClick={() =>
                            onStatusChange({ ...request, status: 5 })
                          }
                          title={t("employeeRequestsTable.actions.complete")}
                        >
                          <CheckCircleIcon className={styles.actionIcon} />
                        </button>

                        <button
                          className={`${styles.actionButton} ${styles.rejectButton}`}
                          onClick={() =>
                            onStatusChange({ ...request, status: 3 })
                          }
                          title={t("employeeRequestsTable.actions.reject")}
                        >
                          <XCircleIcon className={styles.actionIcon} />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
