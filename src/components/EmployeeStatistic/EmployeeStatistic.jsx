import React, { useEffect, useRef, useState } from "react";
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
import { StatisticPDF } from "../../features/pdf/StatisticPdf";
import { pdf } from "@react-pdf/renderer";

export default function EmployeeStatistic() {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const ref = useRef(null);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setDropdownVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleExportPDF = async () => {
    try {
      const requestsWithCorrectEncoding = requests.map((req) => ({
        ...req,
        type: req.type || "",
        status: req.status || "",
        district: req.district || "",
        title: req.title || "",
      }));

      const blob = await pdf(
        <StatisticPDF requests={requestsWithCorrectEncoding} />
      ).toBlob();

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `статистика_заявок_${
        new Date().toISOString().split("T")[0]
      }.pdf`;

      link.click();
      setDropdownVisible(false);
    } catch (error) {
      console.error("Ошибка при экспорте в PDF:", error);
      alert("Произошла ошибка при создании PDF");
    }
  };

  const exportItems = [
    {
      label: "Экспорт в PDF",
      icon: ArrowDownTrayIcon,
      onClick: handleExportPDF,
    },
    {
      label: "Экспорт в Excel",
      icon: ArrowDownTrayIcon,
      onClick: () => {
        alert("Экспорт в Excel");
        setDropdownVisible(false);
      },
    },
    {
      label: "Экспорт в CSV",
      icon: ArrowDownTrayIcon,
      onClick: () => {
        alert("Экспорт в CSV");
        setDropdownVisible(false);
      },
    },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.headerWrapper}>
        <PageHeader title="Статистика заявок" icon={ChartBarIcon} />
        <div className={styles.exportWrapper} ref={ref}>
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
