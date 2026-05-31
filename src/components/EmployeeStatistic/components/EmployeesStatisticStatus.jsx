import React from "react";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/solid";
import Block from "../../../common/Block/Block";
import styles from "./EmployeesStatisticStatus.module.css";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useT } from "../../../utils/useT";
import EmptyBlock from "../../../common/EmptyBlock/EmptyBlock";

export default function EmployeesStatisticStatus({ requests = [] }) {
  const t = useT();

  const statusMap = {
    1: { name: t("employeeRequests.status.new"), color: "#3b82f6" },
    3: { name: t("employeeRequests.status.rejected"), color: "#ef4444" },
    4: { name: t("employeeRequests.status.pending"), color: "#f97316" },
    5: {
      name: t("completed"),
      color: "#22c55e",
    },
  };

  const chartData = requests
    .filter((item) => statusMap[item.status])
    .map((item) => ({
      name: statusMap[item.status].name,
      value: item.count,
      percentage: item.percentage,
      status: item.status,
      color: statusMap[item.status].color,
    }))
    .sort((a, b) => a.status - b.status);

  const COLORS = ["#3dbfa3", "#22c55e", "#f97316", "#ef4444"];

  return (
    <Block
      title={t("employeesStatisticStatus.header")}
      Icon={ClipboardDocumentListIcon}
    >
      {requests?.length === 0 ? (
        <EmptyBlock Icon={ClipboardDocumentListIcon}>
          {t("employeesStatisticStatus.empty")}
        </EmptyBlock>
      ) : (
        <div className={styles.statusWrapper}>
          <PieChart width={800} height={750}>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={100}
              outerRadius={250}
              dataKey="value"
              label={({ name, percent }) =>
                t("employeesStatisticStatus.label", {
                  status: name,
                  percent: (percent * 100).toFixed(0),
                })
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
      )}
    </Block>
  );
}
