import React from "react";
import styles from "../EmployeeStatistic.module.css";
import Button from "../../../common/Button/Button";
import { ReactComponent as PDFIcon } from "../../../assets/pdf-document.svg";
import { ReactComponent as ExcelIcon } from "../../../assets/xlsx.svg";
import { StatisticPDF } from "../../../features/pdf/StatisticPdf";
import { pdf } from "@react-pdf/renderer";
import * as XLSX from "xlsx";
import { useAuthStore } from "../../../stores/authStore";

const categoryMap = {
  0: "Все",
  1: "Водоснабжение. Горячая вода",
  2: "Электроснабжение",
  3: "Бытовые услуги",
  4: "Санитарное состояние многоквартирного дома",
  5: "Отопление",
  6: "Благоустройство территории",
  7: "Водоснабжение",
  8: "Общестроительные работы",
  9: "Санитарное состояние территории",
  11: "Техническое обслуживание ЗПУ",
  12: "Техническое обслуживание лифта",
  13: "Обращение с ТКО",
  14: "Водоснабжение. Холодная вода",
  15: "Канализация",
  16: "Автомобильные дороги, тротуары",
  17: "Кровельные работы",
  18: "Уличное освещение",
  19: "Общественные места (Парки, скверы)",
  20: "Работы по ремонту стыков",
  21: "Техническое обслуживание зданий и сооружений",
  22: "Рекламные и информационные конструкции и объявления",
};

const statusMap = {
  1: "Ожидает проверки",
  2: "Новая",
  3: "Отклонена",
  4: "В работе",
  5: "Завершена",
};

export default function EmployeeStatisticExport({ data, companiesData }) {
  const { user } = useAuthStore();

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
        />
      ).toBlob();

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `статистика_${
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
        "Всего заявок": data.totalCount,
        Выполнено:
          data.requestsByStatuses?.find((s) => s.status === 5)?.count || 0,
        "В работе":
          data.requestsByStatuses?.find((s) => s.status === 4)?.count || 0,
        Новых: data.requestsByStatuses?.find((s) => s.status === 2)?.count || 0,
      },
    ];
    XLSX.utils.book_append_sheet(
      workbook,
      XLSX.utils.json_to_sheet(summaryData),
      "Сводка"
    );

    // Динамика по дням
    const dailyData = data.requestsByDates.map((item) => ({
      Дата: item.displayDate,
      "Количество заявок": item.count,
    }));
    XLSX.utils.book_append_sheet(
      workbook,
      XLSX.utils.json_to_sheet(dailyData),
      "Динамика по дням"
    );

    // Статусы
    const statusData = data.requestsByStatuses.map((item) => ({
      Статус: statusMap[item.status] || `Статус ${item.status}`,
      Количество: item.count,
      Доля: `${item.percentage}%`,
    }));
    XLSX.utils.book_append_sheet(
      workbook,
      XLSX.utils.json_to_sheet(statusData),
      "Статусы"
    );

    // Категории
    const categoryData = data.requestsByCategories.map((item) => ({
      Категория: categoryMap[item.category] || `Категория ${item.category}`,
      Количество: item.count,
      Доля: `${item.percentage}%`,
    }));
    XLSX.utils.book_append_sheet(
      workbook,
      XLSX.utils.json_to_sheet(categoryData),
      "Категории"
    );

    // Компании (только для админа)
    if (user?.role === "Admin" && companiesData?.companies?.length) {
      const companiesDataForExport = companiesData.companies.map((company) => ({
        Компания: company.companyName,
        "Всего заявок": company.totalRequestCount,
        Выполнено: company.completedRequestCount,
        "В работе": company.pendingRequestCount,
        Рейтинг:
          company.rating > 0
            ? `${company.rating} (${company.ratingCount})`
            : "—",
      }));
      XLSX.utils.book_append_sheet(
        workbook,
        XLSX.utils.json_to_sheet(companiesDataForExport),
        "Компании"
      );
    }

    XLSX.writeFile(
      workbook,
      `статистика_${new Date().toISOString().split("T")[0]}.xlsx`
    );
  };

  return (
    <div className={styles.exportButtons}>
      <Button
        className={styles.exportButton}
        variant="secondary"
        onClick={handleExportPDF}
      >
        <PDFIcon className={styles.icon} /> Экспортировать в PDF
      </Button>
      <Button
        className={styles.exportButton}
        variant="secondary"
        onClick={handleExportExcel}
      >
        <ExcelIcon className={styles.icon} /> Экспортировать в Excel
      </Button>
    </div>
  );
}
