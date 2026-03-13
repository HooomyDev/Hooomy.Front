import React from "react";
import { ChartPieIcon } from "@heroicons/react/24/solid";
import Block from "../../common/Block/Block";
import styles from "./EmployeeStatisticTypes.module.css";
import { requestsByTypes } from "../../stores/requestsByType";
import { useT } from "../../utils/useT";

export default function EmployeeStatisticTypes({ requests = [] }) {
  const t = useT();

  const typeStats = requestsByTypes.map((type) => {
    const count = requests.filter((r) => r.type === type).length;
    return { type, count };
  });

  const total = typeStats.reduce((sum, t) => sum + t.count, 0);

  return (
    <Block title={t("employeesStatisticTypes.header")} Icon={ChartPieIcon}>
      <div className={styles.typeList}>
        {typeStats.map(({ type, count }) => {
          const percentage = total ? ((count / total) * 100).toFixed(1) : 0;
          return (
            <div key={type} className={styles.typeItem}>
              <span className={styles.typeName}>{type}</span>
              <div className={styles.typeBar}>
                <div
                  className={styles.typeFill}
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className={styles.typeCount}>
                {count} ({percentage}%)
              </span>
            </div>
          );
        })}
      </div>
    </Block>
  );
}
