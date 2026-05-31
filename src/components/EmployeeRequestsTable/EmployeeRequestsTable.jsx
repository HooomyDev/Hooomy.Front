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
import { categoryMap } from "../../stores/categories";

export default function EmployeeRequestsTable({
  requests = [],
  onSelectRequest,
  onStatusChange,
  getStatusColor,
}) {
  const t = useT();

  const statusMap = {
    0: { label: t("employeeRequests.status.unknown"), icon: null },
    1: { label: t("employeeRequests.status.unknown"), icon: null },
    2: {
      label: t("employeeRequests.status.new"),
      icon: <ClockIcon className={styles.statusIcon} />,
    },
    3: {
      label: t("employeeRequests.status.rejected"),
      icon: <XCircleIcon className={styles.statusIcon} />,
    },
    4: {
      label: t("employeeRequests.status.inProgress"),
      icon: <ClockIcon className={styles.statusIcon} />,
    },
    5: {
      label: t("employeeRequests.status.completed"),
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
            <th>{t("employeeRequestsTable.headers.category")}</th>
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
                    {t(`statistic.categories.${categoryMap[request.category]}`)}
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
                        title={t("employeeRequestsTable.actions.startWork")}
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
