import React, { useState, useEffect } from "react";
import { CalendarDaysIcon } from "@heroicons/react/24/solid";
import Block from "../../common/Block/Block";
import styles from "./EmployeeStatisticChart.module.css";

const EmployeeStatisticChart = ({ requests = [] }) => {
  const [animated, setAnimated] = useState(false);

  const formatLocalYMD = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  const getLast7Days = () => {
    const days = [];
    const now = new Date();

    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      days.push(formatLocalYMD(d));
    }

    return days;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimated(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const last7Days = getLast7Days();

  const chartData = last7Days.map((date) => {
    const count = requests.filter((r) => {
      return r.date === date;
    }).length;

    const displayDate = new Date(`${date}T00:00:00`).toLocaleDateString(
      "ru-RU",
      {
        weekday: "short",
        day: "numeric",
        month: "short",
      }
    );
    const todayStr = formatLocalYMD(new Date());

    return {
      date,
      count,
      displayDate,
      isToday: date === todayStr,
      hasData: count > 0,
      heightPercentage: 0,
    };
  });

  const maxCount = Math.max(...chartData.map((d) => d.count), 1);

  const enhancedChartData = chartData.map((day) => ({
    ...day,
    heightPercentage: day.count > 0 ? (day.count / maxCount) * 100 : 0,
  }));

  const todayCount = enhancedChartData.find((d) => d.isToday)?.count || 0;
  const periodCount = enhancedChartData.reduce((sum, d) => sum + d.count, 0);

  const getBarColor = (heightPercentage) => {
    if (heightPercentage === 0) return "var(--color-gray-light)";

    const intensity = Math.min(heightPercentage / 100, 1);

    return `linear-gradient(to top, 
    rgba(45, 163, 137, ${0.6 + intensity * 0.4}),  /* Темный #2da389 */
    rgba(61, 191, 163, ${0.7 + intensity * 0.3}),  /* Основной #3dbfa3 */
    rgba(93, 212, 184, ${0.8 + intensity * 0.2})   /* Светлый #5dd4b8 */
  )`;
  };

  return (
    <Block title="Динамика заявок (последние 7 дней)" Icon={CalendarDaysIcon}>
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
                    title={`${day.displayDate}: ${day.count} заявок`}
                  >
                    {day.hasData && (
                      <span className={styles.dayCount}>{day.count}</span>
                    )}
                    {day.hasData && day.heightPercentage > 30 && (
                      <div className={styles.barInnerGlow} />
                    )}
                  </div>
                </div>
                <div className={styles.dayLabels}>
                  <span className={styles.dayLabel}>
                    {day.displayDate.split(" ")[0]}
                  </span>
                  <span className={styles.dayDate}>
                    {day.displayDate.split(" ").slice(1).join(" ")}
                  </span>
                  {day.hasData && <div className={styles.dataIndicator} />}
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles.chartGridLines}>
          {[0, 25, 50, 75, 100].map((percent, index) => (
            <div
              key={index}
              className={styles.gridLine}
              style={{ bottom: `${percent}%` }}
            />
          ))}
        </div>

        <div className={`${styles.dailySummary} ${styles.cards}`}>
          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>Сегодня</span>
            <span className={`${styles.summaryValue} ${styles.highlightToday}`}>
              {todayCount} заявок
            </span>
          </div>
          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>За неделю</span>
            <span className={styles.summaryValue}>{periodCount} заявок</span>
          </div>
          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>Максимум</span>
            <span className={`${styles.summaryValue} ${styles.highlightMax}`}>
              {maxCount} заявок
            </span>
          </div>
        </div>
      </div>
    </Block>
  );
};

export default EmployeeStatisticChart;
