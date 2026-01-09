import React, { useState, useEffect } from "react";
import { CalendarDaysIcon } from "@heroicons/react/24/solid";
import Block from "../../common/Block/Block";
import styles from "./EmployeeStatisticChart.module.css";

export default function EmployeeStatisticChart({ requests = [] }) {
  const [animated, setAnimated] = useState(false);
  const [period, setPeriod] = useState("week"); // week, twoWeeks, month, currentMonth, halfYear, year

  const formatLocalYMD = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  const formatLocalYM = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    return `${y}-${m}`;
  };

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const periodDaysMap = {
    week: 7,
    twoWeeks: 14,
    month: 30,
    halfYear: 182,
    year: 365,
  };

  const now = new Date();

  // 🔑 Генерация массива дат или месяцев
  const getLabels = () => {
    if (period === "halfYear" || period === "year") {
      const months = [];
      const count = period === "halfYear" ? 6 : 12;
      for (let i = count - 1; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        months.push(formatLocalYM(d));
      }
      return months;
    } else if (period === "currentMonth") {
      const days = [];
      const start = new Date(now.getFullYear(), now.getMonth(), 1);
      const today = now.getDate();
      for (let i = 0; i < today; i++) {
        const d = new Date(start);
        d.setDate(start.getDate() + i);
        days.push(formatLocalYMD(d));
      }
      return days;
    } else {
      const days = [];
      for (let i = periodDaysMap[period] - 1; i >= 0; i--) {
        const d = new Date(now);
        d.setDate(now.getDate() - i);
        days.push(formatLocalYMD(d));
      }
      return days;
    }
  };

  const labels = getLabels();

  // 🔑 Агрегация заявок
  const chartData = labels.map((label) => {
    let count = 0;

    if (period === "halfYear" || period === "year") {
      count = requests.filter((r) => r.date.trim().startsWith(label)).length;
      const displayDate = new Date(`${label}-01T00:00:00`).toLocaleDateString(
        "ru-RU",
        {
          month: "short",
          year: "numeric",
        }
      );
      return {
        date: label,
        count,
        displayDate,
        isToday: false,
        hasData: count > 0,
      };
    } else {
      count = requests.filter((r) => r.date.trim() === label).length;
      const displayDate = new Date(`${label}T00:00:00`).toLocaleDateString(
        "ru-RU",
        {
          weekday: "short",
          day: "numeric",
          month: "short",
        }
      );
      const todayStr = formatLocalYMD(now);
      return {
        date: label,
        count,
        displayDate,
        isToday: label === todayStr,
        hasData: count > 0,
      };
    }
  });

  const maxCount = Math.max(...chartData.map((d) => d.count), 1);
  const enhancedChartData = chartData.map((d) => ({
    ...d,
    heightPercentage: d.count > 0 ? (d.count / maxCount) * 100 : 0,
  }));

  const todayCount =
    period === "halfYear" || period === "year"
      ? 0
      : enhancedChartData.find((d) => d.isToday)?.count || 0;

  const periodCount = enhancedChartData.reduce((sum, d) => sum + d.count, 0);

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
    <Block title="Динамика заявок" Icon={CalendarDaysIcon}>
      <div className={styles.periodSelector}>
        {["week", "twoWeeks", "month", "currentMonth", "halfYear", "year"].map(
          (key) => (
            <button
              key={key}
              className={`${styles.periodButton} ${
                period === key ? styles.active : ""
              }`}
              onClick={() => setPeriod(key)}
            >
              {key === "week" && "Неделя"}
              {key === "twoWeeks" && "2 недели"}
              {key === "month" && "30 дней"}
              {key === "currentMonth" && "Текущий месяц"}
              {key === "halfYear" && "Полгода"}
              {key === "year" && "Год"}
            </button>
          )
        )}
      </div>

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
                  </div>
                </div>
                <div className={styles.dayLabels}>
                  <span className={styles.dayLabel}>
                    {day.displayDate.split(" ")[0]}
                  </span>
                  <span className={styles.dayDate}>
                    {day.displayDate.split(" ").slice(1).join(" ")}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className={`${styles.dailySummary} ${styles.cards}`}>
          {period !== "halfYear" && period !== "year" && (
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Сегодня</span>
              <span
                className={`${styles.summaryValue} ${styles.highlightToday}`}
              >
                {todayCount} заявок
              </span>
            </div>
          )}
          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>За период</span>
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
}
