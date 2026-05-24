import React from "react";
import {
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import styles from "./EmployeeStatisticCards.module.css";
import { useT } from "../../../utils/useT";

export default function EmployeeStatisticCards({
  requests = [],
  totalRequests = 0,
}) {
  const t = useT();

  // Получаем значения из сгруппированных данных
  const getCountByStatus = (status) => {
    const item = requests.find((r) => r.status === status);
    return item ? item.count : 0;
  };

  const createdRequests = getCountByStatus(1);
  const rejectedRequests = getCountByStatus(2);
  const pendingRequests = getCountByStatus(3);
  const completedRequests = getCountByStatus(4);

  // Проценты
  const pendingPercentage =
    totalRequests > 0 ? Math.round((pendingRequests / totalRequests) * 100) : 0;
  const completedPercentage =
    totalRequests > 0
      ? Math.round((completedRequests / totalRequests) * 100)
      : 0;
  const rejectedPercentage =
    totalRequests > 0
      ? Math.round((rejectedRequests / totalRequests) * 100)
      : 0;
  const createdPercentage =
    totalRequests > 0 ? Math.round((createdRequests / totalRequests) * 100) : 0;

  const statCards = [
    {
      key: "created",
      label: "Создано",
      icon: ClockIcon,
      number: createdRequests,
      percentage: createdPercentage,
      showProgress: true,
      color: "#3b82f6",
    },
    {
      key: "pending",
      label: t("employeeStatisticCards.pending"),
      icon: ClockIcon,
      number: pendingRequests,
      percentage: pendingPercentage,
      showProgress: true,
      color: "#f97316",
    },
    {
      key: "completed",
      label: t("employeeStatisticCards.completed"),
      icon: CheckCircleIcon,
      number: completedRequests,
      percentage: completedPercentage,
      showProgress: true,
      color: "#22c55e",
    },
    {
      key: "rejected",
      label: t("employeeStatisticCards.rejected"),
      icon: XCircleIcon,
      number: rejectedRequests,
      percentage: rejectedPercentage,
      showProgress: true,
      color: "#ef4444",
    },
  ];

  return (
    <div className={styles.statCards}>
      {statCards.map((card) => (
        <div
          key={card.key}
          className={`${styles.statCard} ${styles[card.key]}`}
        >
          <div className={styles.statCardHeader}>
            <card.icon
              className={styles.statIcon}
              style={{ color: card.color }}
            />
            <span className={styles.statLabel}>{card.label}</span>
          </div>

          <div className={styles.statCardContent}>
            <span className={styles.statNumber}>{card.number}</span>
            {card.showProgress && (
              <>
                <div className={styles.statProgress}>
                  <div
                    className={styles.progressBar}
                    style={{
                      width: `${card.percentage}%`,
                      backgroundColor: card.color,
                    }}
                  />
                </div>
                <span className={styles.statPercentage}>
                  {card.percentage}%
                </span>
              </>
            )}
            {card.description && (
              <div className={styles.statDescription}>{card.description}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
