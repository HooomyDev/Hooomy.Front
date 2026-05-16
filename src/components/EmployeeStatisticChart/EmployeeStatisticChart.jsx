import React, { useState, useEffect } from "react";
import { CalendarDaysIcon } from "@heroicons/react/24/solid";
import Block from "../../common/Block/Block";
import { useT } from "../../utils/useT";
import EmployeeStatisticChartDailySummary from "./components/EmployeeStatisticChartDailySummary";
import EmployeeStatisticChartStats from "./components/EmployeeStatisticChartStats";
import styles from "./EmployeeStatisticChart.module.css";
import Loader from "../../common/Loader/Loader";

export default function EmployeeStatisticChart({
  requests,
  period,
  isLoading,
}) {
  const t = useT();
  const [animated, setAnimated] = useState(false);

  // Анимация
  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const enhancedChartData =
    requests &&
    requests.map((d) => ({
      ...d,
      heightPercentage:
        d.count > 0
          ? (d.count / Math.max(...requests.map((d) => d.count), 1)) * 100
          : 0,
    }));

  if (isLoading) return <Loader />;

  return (
    <Block title={t("employeeStatisticChart.header")} Icon={CalendarDaysIcon}>
      {enhancedChartData?.length > 0 ? (
        <>
          <EmployeeStatisticChartStats
            enhancedChartData={enhancedChartData}
            animated={animated}
          />
          <EmployeeStatisticChartDailySummary
            period={period}
            chartData={enhancedChartData}
            enhancedChartData={enhancedChartData}
          />
        </>
      ) : (
        <div className={styles.noDataContainer}>
          <p>Нет данных для отображения</p>
        </div>
      )}
    </Block>
  );
}
