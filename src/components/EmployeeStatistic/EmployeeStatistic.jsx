import React, { useState } from "react";
import { ChartBarIcon } from "@heroicons/react/24/solid";
import PageHeader from "../../common/PageHeader/PageHeader";
import styles from "./EmployeeStatistic.module.css";
import { useAuthStore } from "../../stores/authStore";
import { useQuery } from "@tanstack/react-query";
import { getRequestStatistic } from "../../api/services/requestService";
import { getStatistics } from "../../api/services/companyService";
import EmployeeStatisticContent from "./components/EmployeeStatisticContent";
import EmployeeStatisticExport from "./components/EmployeeStatisticExport";

export default function EmployeeStatistic() {
  const { user } = useAuthStore();
  const [period, setPeriod] = useState(1);

  // Запрос данных
  const { data, isLoading: isRequestsLoading } = useQuery({
    queryKey: ["requestStatistic", period],
    queryFn: () => getRequestStatistic(period, user?.companyId),
    staleTime: 5000,
  });

  const { data: companiesData, isLoading: isCompaniesLoading } = useQuery({
    queryKey: ["companiesStatistics"],
    queryFn: () => getStatistics(),
    staleTime: 5000,
    enabled: user?.role === "Admin",
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.headerWrapper}>
        <PageHeader title={"Статистика"} icon={ChartBarIcon} />
      </div>
      <EmployeeStatisticExport data={data} companiesData={companiesData} />
      <EmployeeStatisticContent
        data={data}
        period={period}
        setPeriod={setPeriod}
        companiesData={companiesData}
        isLoading={isRequestsLoading}
        isCompaniesLoading={isCompaniesLoading}
      />
    </div>
  );
}
