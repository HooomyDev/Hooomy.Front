import React from "react";
import { useT } from "../../../utils/useT";
import styles from "./EmployeeStatisticChartDailySummary.module.css";

export default function EmployeeStatisticChartDailySummary({
  period,
  chartData,
  enhancedChartData,
}) {
  const t = useT();

  const todayCount =
    period === "halfYear" || period === "year"
      ? 0
      : enhancedChartData.find((d) => d.isToday)?.count || 0;

  const periodCount = enhancedChartData.reduce((sum, d) => sum + d.count, 0);

  const maxCount = Math.max(...chartData.map((d) => d.count), 0);

  return (
    <div className={`${styles.dailySummary} ${styles.cards}`}>
      {period !== "halfYear" && period !== "year" && (
        <div className={styles.summaryItem}>
          <span className={styles.summaryLabel}>
            {t("employeeStatisticChart.summary.today")}
          </span>
          <span className={`${styles.summaryValue} ${styles.highlightToday}`}>
            {t("employeeStatisticChart.requestsCount", {
              count: todayCount,
            })}
          </span>
        </div>
      )}
      <div className={styles.summaryItem}>
        <span className={styles.summaryLabel}>
          {t("employeeStatisticChart.summary.period")}
        </span>
        <span className={styles.summaryValue}>
          {t("employeeStatisticChart.requestsCount", {
            count: periodCount,
          })}
        </span>
      </div>
      <div className={styles.summaryItem}>
        <span className={styles.summaryLabel}>
          {t("employeeStatisticChart.summary.max")}
        </span>
        <span className={`${styles.summaryValue} ${styles.highlightMax}`}>
          {t("employeeStatisticChart.requestsCount", { count: maxCount })}
        </span>
      </div>
    </div>
  );
}
