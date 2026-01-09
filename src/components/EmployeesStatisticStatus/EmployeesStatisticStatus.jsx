import React from "react";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/solid";
import Block from "../../common/Block/Block";
import styles from "./EmployeesStatisticStatus.module.css";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function EmployeesStatisticStatus({ requests = [] }) {
  const statusStats = requests.reduce(
    (acc, r) => {
      if (r.status === "В обработке") acc.pending++;
      if (r.status === "Выполнено") acc.completed++;
      if (r.status === "Отклонено") acc.rejected++;
      return acc;
    },
    { pending: 0, completed: 0, rejected: 0 }
  );

  const chartData = [
    { name: "Выполнено", value: statusStats.completed },
    { name: "В обработке", value: statusStats.pending },
    { name: "Отклонено", value: statusStats.rejected },
  ];

  const COLORS = ["#22c55e", "#f97316", "#ef4444"];

  return (
    <Block title="Статистика по статусам" Icon={ClipboardDocumentListIcon}>
      <div className={styles.statusWrapper}>
        <PieChart width={750} height={750}>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={100}
            outerRadius={250}
            dataKey="value"
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </Block>
  );
}
