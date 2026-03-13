import React from "react";
import styles from "./EmployeeRequestsTable.module.css";
import {
  EyeIcon,
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  MapPinIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import { useT } from "../../utils/useT";

export default function EmployeeRequestsTable({
  requests = [],
  onSelectRequest,
  onStatusChange,
  getStatusColor,
}) {
  const t = useT();

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
            <th>{t("employeeRequestsTable.headers.status")}</th>
            <th>{t("employeeRequestsTable.headers.actions")}</th>
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
                    <div className={styles.district}>{request.district} </div>
                    <div className={styles.street}>
                      {request.street}, {request.house}
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
                    title={t("employeeRequestsTable.actions.view")}
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
                          title={t("employeeRequestsTable.actions.complete")}
                        >
                          <CheckCircleIcon className={styles.actionIcon} />
                        </button>

                        <button
                          className={`${styles.actionButton} ${styles.rejectButton}`}
                          onClick={() =>
                            onStatusChange(request.id, "Отклонено")
                          }
                          title={t("employeeRequestsTable.actions.reject")}
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
                    title={t("employeeRequestsTable.actions.comment")}
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
