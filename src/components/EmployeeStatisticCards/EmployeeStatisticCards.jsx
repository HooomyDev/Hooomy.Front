import React from "react";
import {
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/solid";
import styles from "./EmployeeStatisticCards.module.css";
import { useT } from "../../utils/useT";

export default function EmployeeStatisticCards({ requests = [] }) {
  const t = useT();

  const totalRequests = requests.length;
  const pendingRequests = requests.filter(
    (r) => r.status === "В обработке"
  ).length;
  const completedRequests = requests.filter(
    (r) => r.status === "Выполнено"
  ).length;
  const rejectedRequests = requests.filter(
    (r) => r.status === "Отклонено"
  ).length;

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

  const getCompletionTime = () => {
    const completed = requests.filter((r) => r.status === "Выполнено");

    if (completed.length === 0) return t("employeeStatisticCards.notAvailable");

    const avgDays = completed.length;

    return `${avgDays} ${t("employeeStatisticCards.days")}`;
  };

  const statCards = [
    {
      key: "pending",
      label: t("employeeStatisticCards.pending"),
      icon: ClockIcon,
      number: pendingRequests,
      percentage: pendingPercentage,
      showProgress: true,
    },
    {
      key: "completed",
      label: t("employeeStatisticCards.completed"),
      icon: CheckCircleIcon,
      number: completedRequests,
      percentage: completedPercentage,
      showProgress: true,
    },
    {
      key: "rejected",
      label: t("employeeStatisticCards.rejected"),
      icon: XCircleIcon,
      number: rejectedRequests,
      percentage: rejectedPercentage,
      showProgress: true,
    },
    {
      key: "avgTime",
      label: t("employeeStatisticCards.avgTime"),
      icon: CalendarDaysIcon,
      number: getCompletionTime(),
      description: t("employeeStatisticCards.avgTimeDescription"),
      showProgress: false,
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
            <card.icon className={styles.statIcon} />
            <span className={styles.statLabel}>{card.label}</span>
          </div>

          <div className={styles.statCardContent}>
            <span className={styles.statNumber}>{card.number}</span>
            {card.showProgress && (
              <>
                <div className={styles.statProgress}>
                  <div
                    className={styles.progressBar}
                    style={{ width: `${card.percentage}%` }}
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
