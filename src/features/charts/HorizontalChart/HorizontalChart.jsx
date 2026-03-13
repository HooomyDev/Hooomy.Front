import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import styles from "./HorizontalChart.module.css";
import { useT } from "../../../utils/useT";

export default function HorizontalChart({ data }) {
  const t = useT();

  return (
    <div className={styles.chartWrapper}>
      <ResponsiveContainer width="100%" height={1500}>
        <BarChart
          layout="vertical"
          data={data}
          margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
        >
          <XAxis
            type="number"
            tick={{ fill: "#374151", fontSize: 12 }}
            tickFormatter={(v) =>
              `${v.toFixed(1)} ${t("statistic.chart.unit")}`
            }
            label={{
              value: t("statistic.chart.xLabel"),
              position: "insideBottom",
              offset: -5,
              fill: "#6b7280",
            }}
          />
          <YAxis
            dataKey="category"
            type="category"
            width={200}
            tick={{ fill: "#374151", fontSize: 12 }}
          />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="inProgress"
            fill="#3B82F6"
            name={t("statistic.chart.inProgress")}
          />
          <Bar
            dataKey="completed"
            fill="#EF4444"
            name={t("statistic.chart.completed")}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
