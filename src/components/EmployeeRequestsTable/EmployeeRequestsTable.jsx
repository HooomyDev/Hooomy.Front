import React from "react";
import styles from "./EmployeeRequestsTable.module.css";
import {
  EyeIcon,
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  MapPinIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";

export default function EmployeeRequestsTable({
  requests = [],
  onSelectRequest,
  onStatusChange,
  getStatusColor,
}) {
  if (requests.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>Заявки не найдены</p>
      </div>
    );
  }

  return (
    <div className={styles.requestsTable}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Заявка</th>
            <th>Адрес</th>
            <th>Дата</th>
            <th>Статус</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
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
                <div className={styles.addressInfo}>
                  <MapPinIcon className={styles.addressIcon} />
                  <div>
                    <div className={styles.district}>
                      {request.district} район
                    </div>
                    <div className={styles.street}>
                      ул. {request.street}, д. {request.house}
                    </div>
                  </div>
                </div>
              </td>
              <td className={styles.dateCell}>{request.date}</td>
              <td>
                <span
                  className={styles.statusBadge}
                  style={{
                    backgroundColor: getStatusColor(request.status),
                  }}
                >
                  {request.status}
                </span>
              </td>
              <td>
                <div className={styles.actions}>
                  <button
                    className={`${styles.actionButton} ${styles.viewButton}`}
                    onClick={() => onSelectRequest(request)}
                    title="Просмотр деталей"
                  >
                    <EyeIcon className={styles.actionIcon} />
                  </button>

                  {request.status !== "Выполнено" &&
                    request.status !== "Отклонено" && (
                      <>
                        <button
                          className={`${styles.actionButton} ${styles.completeButton}`}
                          onClick={() =>
                            onStatusChange(request.id, "Выполнено")
                          }
                          title="Отметить как выполненное"
                        >
                          <CheckCircleIcon className={styles.actionIcon} />
                        </button>

                        <button
                          className={`${styles.actionButton} ${styles.rejectButton}`}
                          onClick={() =>
                            onStatusChange(request.id, "Отклонено")
                          }
                          title="Отклонить заявку"
                        >
                          <XCircleIcon className={styles.actionIcon} />
                        </button>
                      </>
                    )}

                  <button
                    className={`${styles.actionButton} ${styles.commentButton}`}
                    onClick={() => {
                      onSelectRequest(request);
                      document.getElementById("commentInput")?.focus();
                    }}
                    title="Добавить комментарий"
                  >
                    <ChatBubbleLeftRightIcon className={styles.actionIcon} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
