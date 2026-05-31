import React from "react";
import styles from "../EmployeeStatistic.module.css";
import Button from "../../../common/Button/Button";
import { ReactComponent as PDFIcon } from "../../../assets/pdf-document.svg";
import { ReactComponent as ExcelIcon } from "../../../assets/xlsx.svg";
import { StatisticPDF } from "../../../features/pdf/StatisticPdf";
import { pdf } from "@react-pdf/renderer";
import * as XLSX from "xlsx";
import { useAuthStore } from "../../../stores/authStore";
import { useT } from "../../../utils/useT";
import { categoryMap } from "../../../stores/categories";

export default function EmployeeStatisticExport({ data, companiesData }) {
  const { user } = useAuthStore();
  const t = useT();

  const statusMap = {
    1: t("requests.status.awaitingReview"),
    2: t("requests.status.new"),
    3: t("requests.status.rejected"),
    4: t("requests.status.pending"),
    5: t("requests.status.completed"),
  };

  const handleExportPDF = async () => {
    try {
      if (!data || !data.requestsByDates) {
        console.error("Нет данных для экспорта");
        return;
      }

      const blob = await pdf(
        <StatisticPDF
          data={data}
          companiesData={user?.role === "Admin" ? companiesData : null}
        />,
      ).toBlob();

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${t("employeeStatistic.filenamePrefix")}_${
        new Date().toISOString().split("T")[0]
      }.pdf`;
      link.click();

      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error("Ошибка при экспорте в PDF:", error);
    }
  };

  const handleExportExcel = () => {
    if (!data) return;

    const workbook = XLSX.utils.book_new();

    // Сводка
    const summaryData = [
      {
        [t("employeeStatistic.exportColumns.totalRequests")]: data.totalCount,
        [t("employeeStatistic.exportColumns.completed")]:
          data.requestsByStatuses?.find((s) => s.status === 5)?.count || 0,
        [t("employeeStatistic.exportColumns.inProgress")]:
          data.requestsByStatuses?.find((s) => s.status === 4)?.count || 0,
        [t("employeeStatistic.exportColumns.new")]:
          data.requestsByStatuses?.find((s) => s.status === 2)?.count || 0,
      },
    ];
    XLSX.utils.book_append_sheet(
      workbook,
      XLSX.utils.json_to_sheet(summaryData),
      t("employeeStatistic.exportSheets.summary"),
    );

    // Динамика по дням
    const dailyData = data.requestsByDates.map((item) => ({
      [t("employeeStatistic.exportColumns.date")]: item.displayDate,
      [t("employeeStatistic.exportColumns.requestsCount")]: item.count,
    }));
    XLSX.utils.book_append_sheet(
      workbook,
      XLSX.utils.json_to_sheet(dailyData),
      t("employeeStatistic.exportSheets.daily"),
    );

    // Статусы
    const statusData = data.requestsByStatuses.map((item) => ({
      [t("employeeStatistic.exportColumns.status")]:
        statusMap[item.status] || `Status ${item.status}`,
      [t("employeeStatistic.exportColumns.count")]: item.count,
      [t("employeeStatistic.exportColumns.percentage")]: `${item.percentage}%`,
    }));
    XLSX.utils.book_append_sheet(
      workbook,
      XLSX.utils.json_to_sheet(statusData),
      t("employeeStatistic.exportSheets.statuses"),
    );

    // Категории
    const categoryData = data.requestsByCategories.map((item) => ({
      [t("employeeStatistic.exportColumns.category")]:
        categoryMap[item.category] || `Category ${item.category}`,
      [t("employeeStatistic.exportColumns.count")]: item.count,
      [t("employeeStatistic.exportColumns.percentage")]: `${item.percentage}%`,
    }));
    XLSX.utils.book_append_sheet(
      workbook,
      XLSX.utils.json_to_sheet(categoryData),
      t("employeeStatistic.exportSheets.categories"),
    );

    // Компании (только для админа)
    if (user?.role === "Admin" && companiesData?.companies?.length) {
      const companiesDataForExport = companiesData.companies.map((company) => ({
        [t("companyStatistics.table.company")]: company.companyName,
        [t("employeeStatistic.exportColumns.totalRequests")]:
          company.totalRequestCount,
        [t("employeeStatistic.exportColumns.completed")]:
          company.completedRequestCount,
        [t("employeeStatistic.exportColumns.inProgress")]:
          company.pendingRequestCount,
        [t("companyStatistics.table.rating")]:
          company.rating > 0
            ? `${company.rating} (${company.ratingCount})`
            : "—",
      }));
      XLSX.utils.book_append_sheet(
        workbook,
        XLSX.utils.json_to_sheet(companiesDataForExport),
        t("employeeStatistic.exportSheets.companies"),
      );
    }

    XLSX.writeFile(
      workbook,
      `${t("employeeStatistic.filenamePrefix")}_${new Date().toISOString().split("T")[0]}.xlsx`,
    );
  };

  return (
    <div className={styles.exportButtons}>
      <Button
        className={styles.exportButton}
        variant="secondary"
        onClick={handleExportPDF}
      >
        <PDFIcon className={styles.icon} />{" "}
        {t("employeeStatistic.exportItems.pdf")}
      </Button>
      <Button
        className={styles.exportButton}
        variant="secondary"
        onClick={handleExportExcel}
      >
        <ExcelIcon className={styles.icon} />{" "}
        {t("employeeStatistic.exportItems.excel")}
      </Button>
    </div>
  );
}
