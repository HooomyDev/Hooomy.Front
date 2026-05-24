import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import RobotoRegular from "../../styles/fonts/Roboto-Regular.ttf";
import RobotoBold from "../../styles/fonts/Roboto-Bold.ttf";

Font.register({
  family: "Roboto",
  fonts: [
    {
      src: RobotoRegular,
      fontWeight: "normal",
      fontStyle: "normal",
    },
    {
      src: RobotoBold,
      fontWeight: "bold",
      fontStyle: "normal",
    },
  ],
});

const pdfStyles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: "Roboto",
    lineHeight: 1.4,
  },
  section: {
    marginBottom: 25,
  },
  header: {
    fontSize: 20,
    marginBottom: 12,
    fontFamily: "Roboto",
    fontWeight: "bold",
    textAlign: "center",
    borderBottom: "1pt solid #333",
    paddingBottom: 6,
  },
  subheader: {
    fontSize: 14,
    marginBottom: 10,
    fontFamily: "Roboto",
    fontWeight: "bold",
    backgroundColor: "#f0f0f0",
    padding: 4,
  },
  table: {
    display: "table",
    width: "100%",
    marginTop: 12,
    border: "1pt solid #333",
    borderCollapse: "collapse",
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    flex: 1,
    borderRight: "1pt solid #333",
    borderBottom: "1pt solid #333",
    padding: 6,
    fontSize: 10,
  },
  cellHeader: {
    flex: 1,
    borderRight: "1pt solid #333",
    borderBottom: "1pt solid #333",
    padding: 6,
    fontSize: 10,
    fontWeight: "bold",
    backgroundColor: "#f0f0f0",
  },
  footer: {
    marginTop: 20,
    fontSize: 9,
    textAlign: "right",
    color: "#555",
  },
  barContainer: {
    marginVertical: 8,
  },
  barLabel: {
    fontSize: 9,
    marginBottom: 2,
  },
  bar: {
    height: 16,
    backgroundColor: "#3dbfa3",
    borderRadius: 4,
  },
  companyRow: {
    flexDirection: "row",
    marginBottom: 4,
    padding: 4,
    borderBottom: "1pt solid #eee",
  },
  companyName: {
    width: "40%",
    fontSize: 10,
  },
  companyStats: {
    width: "15%",
    fontSize: 10,
    textAlign: "center",
  },
  ratingStars: {
    width: "20%",
    fontSize: 10,
  },
});

const statusMap = {
  1: "Ожидает проверки",
  2: "Новая",
  3: "Отклонена",
  4: "В работе",
  5: "Завершена",
};

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

export const StatisticPDF = ({ data, companiesData }) => {
  const {
    requestsByDates,
    requestsByStatuses,
    requestsByCategories,
    totalCount,
  } = data;

  const totalRequests =
    totalCount || requestsByDates.reduce((sum, d) => sum + d.count, 0);
  const completedCount =
    requestsByStatuses?.find((s) => s.status === 5)?.count || 0;
  const completedPercent =
    totalRequests > 0 ? ((completedCount / totalRequests) * 100).toFixed(1) : 0;

  return (
    <Document>
      <Page size="A4" style={pdfStyles.page}>
        {/* Заголовок */}
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.header}>Статистика</Text>
          <Text>Дата экспорта: {new Date().toLocaleDateString("ru-RU")}</Text>
          <Text>Всего заявок: {totalRequests}</Text>
          <Text>
            Завершено заявок: {completedCount} ({completedPercent}%)
          </Text>
        </View>

        {companiesData && (
          <View style={pdfStyles.section}>
            <Text style={pdfStyles.subheader}>Статистика по ЖЭУ</Text>

            {/* Сводка по компаниям */}
            <View style={{ marginBottom: 15 }}>
              <Text>Всего: {companiesData?.length || 0}</Text>
            </View>

            {/* Таблица компаний */}
            <View style={pdfStyles.table}>
              <View style={pdfStyles.row}>
                <Text style={pdfStyles.cellHeader}>Компания</Text>
                <Text style={pdfStyles.cellHeader}>Заявок</Text>
                <Text style={pdfStyles.cellHeader}>Выполнено</Text>
                <Text style={pdfStyles.cellHeader}>В работе</Text>
                <Text style={pdfStyles.cellHeader}>Рейтинг</Text>
              </View>
              {companiesData.map((company, i) => (
                <View key={i} style={pdfStyles.row}>
                  <Text style={pdfStyles.cell}>{company.companyName}</Text>
                  <Text style={pdfStyles.cell}>
                    {company.totalRequestCount}
                  </Text>
                  <Text style={pdfStyles.cell}>
                    {company.completedRequestCount}
                  </Text>
                  <Text style={pdfStyles.cell}>
                    {company.pendingRequestCount}
                  </Text>
                  <Text style={pdfStyles.cell}>
                    {company.rating > 0
                      ? `${company.rating} (${company.ratingCount})`
                      : "—"}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Динамика по дням */}
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.subheader}>Динамика заявок по дням</Text>
          <View style={pdfStyles.table}>
            <View style={pdfStyles.row}>
              <Text style={pdfStyles.cellHeader}>Дата</Text>
              <Text style={pdfStyles.cellHeader}>Заявок</Text>
            </View>
            {requestsByDates.map((item, i) => (
              <View key={i} style={pdfStyles.row}>
                <Text style={pdfStyles.cell}>{item.date}</Text>
                <Text style={pdfStyles.cell}>{item.count}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Распределение по статусам */}
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.subheader}>Распределение по статусам</Text>
          <View style={pdfStyles.table}>
            <View style={pdfStyles.row}>
              <Text style={pdfStyles.cellHeader}>Статус</Text>
              <Text style={pdfStyles.cellHeader}>Количество</Text>
              <Text style={pdfStyles.cellHeader}>Доля</Text>
            </View>
            {requestsByStatuses.map((item, i) => (
              <View key={i} style={pdfStyles.row}>
                <Text style={pdfStyles.cell}>
                  {statusMap[item.status] || "Неизвестно"}
                </Text>
                <Text style={pdfStyles.cell}>{item.count}</Text>
                <Text style={pdfStyles.cell}>{item.percentage}%</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Распределение по категориям */}
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.subheader}>Распределение по категориям</Text>
          <View style={pdfStyles.table}>
            <View style={pdfStyles.row}>
              <Text style={pdfStyles.cellHeader}>Категория</Text>
              <Text style={pdfStyles.cellHeader}>Количество</Text>
              <Text style={pdfStyles.cellHeader}>Доля</Text>
            </View>
            {requestsByCategories.map((item, i) => (
              <View key={i} style={pdfStyles.row}>
                <Text style={pdfStyles.cell}>
                  {categoryMap[item.category] || `Категория ${item.category}`}
                </Text>
                <Text style={pdfStyles.cell}>{item.count}</Text>
                <Text style={pdfStyles.cell}>{item.percentage}%</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={pdfStyles.footer}>
          <Text>Сгенерировано в системе Hooome</Text>
        </View>
      </Page>
    </Document>
  );
};
