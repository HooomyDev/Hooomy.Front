import React, { useState, useEffect } from "react";
import { CalendarDaysIcon } from "@heroicons/react/24/solid";
import Block from "../../common/Block/Block";
import { useT } from "../../utils/useT";
import EmployeeStatisticChartPeriodSelector from "./components/EmployeeStatisticChartPeriodSelector";
import EmployeeStatisticChartDailySummary from "./components/EmployeeStatisticChartDailySummary";
import EmployeeStatisticChartStats from "./components/EmployeeStatisticChartStats";
import { useQuery } from "@tanstack/react-query";
import { getRequestStatistic } from "../../api/services/requestService";
import styles from "./EmployeeStatisticChart.module.css";
import Loader from "../../common/Loader/Loader";

export default function EmployeeStatisticChart() {
  const t = useT();
  const [period, setPeriod] = useState(1);
  const [animated, setAnimated] = useState(false);

  // Запрос данных
  const { data, isLoading } = useQuery({
    queryKey: ["requestStatistic", period],
    queryFn: () => getRequestStatistic(period),
    staleTime: 0,
  });

  // Анимация
  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const enhancedChartData =
    data &&
    data.map((d) => ({
      ...d,
      heightPercentage:
        d.count > 0
          ? (d.count / Math.max(...data.map((d) => d.count), 1)) * 100
          : 0,
    }));

  if (isLoading) return <Loader />;

  return (
    <Block title={t("employeeStatisticChart.header")} Icon={CalendarDaysIcon}>
      <EmployeeStatisticChartPeriodSelector
        onSelect={setPeriod}
        period={period}
      />

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
