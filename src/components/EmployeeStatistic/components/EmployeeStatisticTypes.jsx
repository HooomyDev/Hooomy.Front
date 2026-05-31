import React, { useMemo } from "react";
import { ChartPieIcon } from "@heroicons/react/24/solid";
import Block from "../../../common/Block/Block";
import styles from "./EmployeeStatisticTypes.module.css";
import { useT } from "../../../utils/useT";
import { categoryMap } from "../../../stores/categories";

export default function EmployeeStatisticTypes({ requests = [] }) {
  const t = useT();

  const typeStats = useMemo(() => {
    return Object.entries(categoryMap)
      .map(([code, key]) => {
        const categoryCode = Number(code);
        const stat = requests.find((r) => r.category === categoryCode);

        return {
          code: categoryCode,
          name: t(`statistic.categories.${key}`),
          count: stat?.count || 0,
          percentage: stat?.percentage || 0,
        };
      })
      .sort((a, b) => a.code - b.code);
  }, [requests, t]);

  return (
    <Block title={t("employeesStatisticTypes.header")} Icon={ChartPieIcon}>
      <div className={styles.typeList}>
        {typeStats.map((item) => (
          <div key={item.code} className={styles.typeItem}>
            <span className={styles.typeName}>{item.name}</span>
            <div className={styles.typeBar}>
              <div
                className={styles.typeFill}
                style={{
                  width: `${item.percentage}%`,
                }}
              />
            </div>
            <span className={styles.typeValue}>
              {item.count} ({item.percentage.toFixed(1)}%)
            </span>
          </div>
        ))}
      </div>
    </Block>
  );
}
