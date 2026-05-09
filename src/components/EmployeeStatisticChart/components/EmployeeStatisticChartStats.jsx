import React from "react";
import styles from "./EmployeeStatisticChartStats.module.css";
import { useT } from "../../../utils/useT";

export default function EmployeeStatisticChartStats({
  enhancedChartData,
  animated,
}) {
  const t = useT();

  const getBarColor = (heightPercentage) => {
    if (heightPercentage === 0) return "var(--color-gray-light)";
    const intensity = Math.min(heightPercentage / 100, 1);
    return `linear-gradient(to top, 
      rgba(45, 163, 137, ${0.6 + intensity * 0.4}),
      rgba(61, 191, 163, ${0.7 + intensity * 0.3}),
      rgba(93, 212, 184, ${0.8 + intensity * 0.2})
    )`;
  };

  return (
    <div className={styles.dailyStats}>
      <div className={styles.dailyChart}>
        {enhancedChartData.map((day, index) => {
          const barStyle = {
            height: `${day.heightPercentage}%`,
            background: getBarColor(day.heightPercentage),
            "--final-height": `${day.heightPercentage}%`,
          };
          return (
            <div
              key={`${day.date}-${index}`}
              className={`${styles.dayColumn} ${
                day.isToday ? styles.today : ""
              } ${day.hasData ? styles.hasData : styles.noData}`}
            >
              <div className={styles.dayBarContainer}>
                <div
                  className={`${styles.dayBar} ${
                    day.isToday ? styles.dayBarToday : ""
                  } ${animated ? styles.animated : ""}`}
                  style={barStyle}
                  title={t("employeeStatisticChart.barTitle", {
                    date: day.displayDate,
                    count: day.count,
                  })}
                >
                  {day.hasData && (
                    <span className={styles.dayCount}>{day.count}</span>
                  )}
                </div>
              </div>
              <div className={styles.dayLabels}>
                <span className={styles.dayLabel}>
                  {day.displayDate?.split(" ")[0]}
                </span>
                <span className={styles.dayDate}>
                  {day.displayDate?.split(" ").slice(1).join(" ")}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
