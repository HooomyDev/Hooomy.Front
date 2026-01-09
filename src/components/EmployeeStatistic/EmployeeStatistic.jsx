import React from "react";
import { ChartBarIcon } from "@heroicons/react/24/solid";
import PageHeader from "../../common/PageHeader/PageHeader";
import requests from "./requests";
import styles from "./EmployeeStatistic.module.css";
import EmployeeStatisticCards from "../EmployeeStatisticCards/EmployeeStatisticCards";
import EmployeeStatisticDistricts from "../EmployeeStatisticDisctricts/EmployeeStatisticDistricts";
import EmployeeStatisticChart from "../EmployeeStatisticChart/EmployeeStatisticChart";

export default function EmployeeStatistic() {
  return (
    <div className={styles.wrapper}>
      <PageHeader title="Статистика заявок" icon={ChartBarIcon} />

      <div className={styles.content}>
        <EmployeeStatisticCards requests={requests} />

        <EmployeeStatisticDistricts requests={requests} />

        <EmployeeStatisticChart requests={requests} />
      </div>
    </div>
  );
}
