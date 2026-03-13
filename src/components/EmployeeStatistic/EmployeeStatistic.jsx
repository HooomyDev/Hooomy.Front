import React, { useEffect, useRef, useState } from "react";
import { ChartBarIcon, ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import { ReactComponent as PDFIcon } from "../../assets/pdf-document.svg";
import { ReactComponent as ExcelIcon } from "../../assets/xlsx.svg";
import { ReactComponent as CSVIcon } from "../../assets/csv.svg";
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
import * as XLSX from "xlsx";
import { useT } from "../../utils/useT";

export default function EmployeeStatistic() {
  const t = useT();

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
    }
  };

  const handleExportExcel = () => {
    const data = requests.map((r) => ({
      "ID заявки": r.id,
      Название: r.title,
      Статус: r.status,
      Дата: r.date,
      Район: r.district,
      Улица: r.street,
      Дом: r.house,
      Квартира: r.apartment,
      Тип: r.type,
      Приоритет: r.priority,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Заявки");

    XLSX.writeFile(workbook, "statistic.xlsx");
  };

  const handleExportCSV = () => {
    const headers = [
      "ID заявки",
      "Название",
      "Статус",
      "Дата",
      "Район",
      "Тип",
      "Приоритет",
    ];
    const rows = requests.map((r) => [
      r.id,
      r.title,
      r.status,
      r.date,
      r.district,
      r.type,
      r.priority,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) =>
        row
          .map((cell) =>
            typeof cell === "string" && cell.includes(",") ? `"${cell}"` : cell
          )
          .join(";")
      )
      .join("\n");

    const blob = new Blob(["\uFEFF" + csvContent], {
      type: "text/csv;charset=utf-8;",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "statistic.csv";
    link.click();

    setDropdownVisible(false);
  };

  const exportItems = [
    {
      label: t("employeeStatistic.exportItems.pdf"),
      icon: PDFIcon,
      onClick: handleExportPDF,
    },
    {
      label: t("employeeStatistic.exportItems.excel"),
      icon: ExcelIcon,
      onClick: handleExportExcel,
    },
    {
      label: t("employeeStatistic.exportItems.csv"),
      icon: CSVIcon,
      onClick: handleExportCSV,
    },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.headerWrapper}>
        <PageHeader title={t("employeeStatistic.header")} icon={ChartBarIcon} />
        <div className={styles.exportWrapper} ref={ref}>
          <Block>
            <div
              className={styles.export}
              onClick={() => setDropdownVisible((prev) => !prev)}
            >
              <ArrowDownTrayIcon className={styles.exportIcon} />
              <span>{t("employeeStatistic.export")}</span>
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
