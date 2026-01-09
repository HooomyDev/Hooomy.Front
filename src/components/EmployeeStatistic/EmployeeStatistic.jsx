import React, { useState } from "react";
import { ChartBarIcon, ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import PageHeader from "../../common/PageHeader/PageHeader";
import requests from "./requests";
import styles from "./EmployeeStatistic.module.css";
import EmployeeStatisticCards from "../EmployeeStatisticCards/EmployeeStatisticCards";
import EmployeeStatisticDistricts from "../EmployeeStatisticDisctricts/EmployeeStatisticDistricts";
import EmployeeStatisticChart from "../EmployeeStatisticChart/EmployeeStatisticChart";
import EmployeeStatisticStatus from "../EmployeesStatisticStatus/EmployeesStatisticStatus";
import EmployeeStatisticTypes from "../EmployeeStatisticTypes/EmployeeStatisticTypes";
import Block from "../../common/Block/Block";
import Dropdown from "../../common/Dropdown/Dropdown";

export default function EmployeeStatistic() {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleExportPDF = async () => {};

  const exportItems = [
    {
      label: "Экспорт в PDF",
      icon: ArrowDownTrayIcon,
      onClick: handleExportPDF,
    },
    {
      label: "Экспорт в Excel",
      icon: ArrowDownTrayIcon,
      onClick: () => console.log("Экспорт в Excel"),
    },
    {
      label: "Экспорт в CSV",
      icon: ArrowDownTrayIcon,
      onClick: () => console.log("Экспорт в CSV"),
    },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.headerWrapper}>
        <PageHeader title="Статистика заявок" icon={ChartBarIcon} />
        <div className={styles.exportWrapper}>
          <Block>
            <div
              className={styles.export}
              onClick={() => setDropdownVisible((prev) => !prev)}
            >
              <ArrowDownTrayIcon className={styles.exportIcon} />
              <span>Экспорт</span>
            </div>
          </Block>
          <Dropdown items={exportItems} visible={dropdownVisible} />
        </div>
      </div>

      <div className={styles.content}>
        <EmployeeStatisticCards requests={requests} />
        <EmployeeStatisticDistricts requests={requests} />
        <EmployeeStatisticChart requests={requests} />
        <EmployeeStatisticStatus requests={requests} />
        <EmployeeStatisticTypes requests={requests} />
      </div>
    </div>
  );
}
