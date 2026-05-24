import React from "react";
import styles from "../EmployeeStatistic.module.css";
import EmployeeStatisticCards from "./EmployeeStatisticCards";
import EmployeeStatisticChart from "../../EmployeeStatisticChart/EmployeeStatisticChart";
import EmployeeStatisticStatus from "./EmployeesStatisticStatus";
import EmployeeStatisticTypes from "./EmployeeStatisticTypes";
import EmployeeStatisticChartPeriodSelector from "../../EmployeeStatisticChart/components/EmployeeStatisticChartPeriodSelector";
import CompanyStatistics from "./CompanyStatistics";
import Loader from "../../../common/Loader/Loader";
import { useAuthStore } from "../../../stores/authStore";

export default function EmployeeStatisticContent({
  data,
  isLoading,
  period,
  setPeriod,
  companiesData,
  isCompaniesLoading,
}) {
  const { user } = useAuthStore();

  if (isLoading) return <Loader />;

  return (
    <div className={styles.content}>
      <EmployeeStatisticChartPeriodSelector
        onSelect={setPeriod}
        period={period}
      />
      <EmployeeStatisticChart
        requests={data?.requestsByDates || []}
        period={period}
        setPeriod={setPeriod}
        isLoading={isLoading}
      />
      <EmployeeStatisticCards
        requests={data?.requestsByStatuses || []}
        totalRequests={data?.totalCount || 0}
      />
      <EmployeeStatisticStatus requests={data?.requestsByStatuses || []} />
      <EmployeeStatisticTypes requests={data?.requestsByCategories || []} />

      {user?.role === "Admin" && (
        <>
          {isCompaniesLoading ? (
            <Loader />
          ) : (
            <CompanyStatistics companies={companiesData || []} />
          )}
        </>
      )}
    </div>
  );
}
