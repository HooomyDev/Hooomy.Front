import React, { useMemo } from "react";
import { ChartPieIcon } from "@heroicons/react/24/solid";
import Block from "../../common/Block/Block";
import styles from "./EmployeeStatisticTypes.module.css";
import { useT } from "../../utils/useT";
import { useQuery } from "@tanstack/react-query";
import { getRequestCategories } from "../../api/services/requestService";
import Loader from "../../common/Loader/Loader";

export default function EmployeeStatisticTypes({ requests = [] }) {
  const t = useT();

  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getRequestCategories(),
  });

  const categoryMap = useMemo(() => {
    if (!categories) return new Map();
    return new Map(categories.map((cat) => [cat.code, cat.name]));
  }, [categories]);

  const typeStats = useMemo(() => {
    if (!categories) return [];

    return categories
      .filter((cat) => cat.code !== 0) // Убираем "Все"
      .map((cat) => {
        // Ищем данные по категории из API
        const stat = requests.find((r) => r.category === cat.code);

        return {
          code: cat.code,
          name: cat.name,
          count: stat?.count || 0,
          percentage: stat?.percentage || 0,
        };
      })
      .sort((a, b) => a.code - b.code);
  }, [categories, requests]);

  if (isLoading) return <Loader />;

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
