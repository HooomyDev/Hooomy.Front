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
  table: {
    display: "table",
    width: "100%",
    marginTop: 12,
    border: "1pt solid #333",
    borderCollapse: "collapse",
    fontFamily: "Roboto",
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    flex: 1,
    borderRight: "1pt solid #333",
    borderBottom: "1pt solid #333",
    padding: 6,
    fontFamily: "Roboto",
    fontSize: 10,
  },
  cellHeader: {
    flex: 1,
    borderRight: "1pt solid #333",
    borderBottom: "1pt solid #333",
    padding: 6,
    fontFamily: "Roboto",
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
});

const calcSummary = (requests) => {
  const total = requests.length;
  const done = requests.filter((r) => r.status === "Выполнено").length;
  const avgTime =
    requests.reduce((acc, r) => acc + (r.days || 0), 0) / (total || 1);

  return {
    total,
    percentDone: ((done / total) * 100).toFixed(1),
    avgTime: avgTime.toFixed(1),
  };
};

const groupByDistrict = (requests) => {
  const grouped = {};
  requests.forEach((r) => {
    if (!grouped[r.district]) grouped[r.district] = [];
    grouped[r.district].push(r);
  });
  return grouped;
};

export const StatisticPDF = ({ requests }) => {
  const summary = calcSummary(requests);
  const districts = groupByDistrict(requests);

  return (
    <Document>
      <Page size="A4" style={pdfStyles.page}>
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.header}>Статистика заявок</Text>
          <Text>Дата экспорта: {new Date().toLocaleDateString()}</Text>
        </View>

        <View style={pdfStyles.section}>
          <Text>Всего заявок: {summary.total}</Text>
          <Text>Выполнено: {summary.percentDone}%</Text>
          <Text>Среднее время обработки: {summary.avgTime} дн.</Text>
        </View>

        <View style={pdfStyles.section}>
          <Text style={pdfStyles.header}>Список заявок</Text>
          <View style={pdfStyles.table}>
            <View style={pdfStyles.row}>
              <Text style={pdfStyles.cell}>ID</Text>
              <Text style={pdfStyles.cell}>Тип</Text>
              <Text style={pdfStyles.cell}>Статус</Text>
              <Text style={pdfStyles.cell}>Район</Text>
              <Text style={pdfStyles.cell}>Дата</Text>
            </View>
            {requests.map((req, i) => (
              <View key={i} style={pdfStyles.row}>
                <Text style={pdfStyles.cell}>{req.id}</Text>
                <Text style={pdfStyles.cell}>{req.type}</Text>
                <Text style={pdfStyles.cell}>{req.status}</Text>
                <Text style={pdfStyles.cell}>{req.district}</Text>
                <Text style={pdfStyles.cell}>{req.date}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={pdfStyles.section}>
          <Text style={pdfStyles.header}>Распределение по районам</Text>
          {Object.entries(districts).map(([district, items]) => (
            <View key={district} style={{ marginBottom: 10 }}>
              <Text>
                {district}: {items.length} заявок
              </Text>
              {items.map((r, i) => (
                <Text key={i}>
                  — {r.type} ({r.status})
                </Text>
              ))}
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};
