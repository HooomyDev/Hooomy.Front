import React, { useState } from "react";
import { MapPinIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import Block from "../../common/Block/Block";
import styles from "./EmployeeStatisticDistricts.module.css";

const EmployeeStatisticDistricts = ({ requests = [] }) => {
  const [showAllDistricts, setShowAllDistricts] = useState(false);

  // считаем заявки по районам
  const districtStats = requests.reduce((acc, request) => {
    const district = request.district.trim();
    if (!acc[district]) {
      acc[district] = {
        total: 0,
        pending: 0,
        completed: 0,
        rejected: 0,
        name: district,
      };
    }
    acc[district].total++;
    if (request.status === "В обработке") acc[district].pending++;
    if (request.status === "Выполнено") acc[district].completed++;
    if (request.status === "Отклонено") acc[district].rejected++;
    return acc;
  }, {});

  const sortedDistricts = Object.values(districtStats).sort(
    (a, b) => b.total - a.total
  );

  const visibleDistricts = showAllDistricts
    ? sortedDistricts
    : sortedDistricts.slice(0, 5);

  return (
    <Block title="Распределение по районам" Icon={MapPinIcon}>
      <div
        className={`${styles.districtStats} ${
          showAllDistricts ? styles.open : styles.collapsed
        }`}
      >
        <div className={styles.districtList}>
          {visibleDistricts.map((district, index) => (
            <div key={district.name} className={styles.districtItem}>
              <div className={styles.districtInfo}>
                <span className={styles.districtRank}>{index + 1}</span>
                <span className={styles.districtName}>{district.name}</span>
                <span className={styles.districtCount}>
                  {district.total} заявки(-ок)
                </span>
              </div>
              <div className={styles.districtStatuses}>
                <span
                  className={styles.statusBadge}
                  style={{ backgroundColor: "#22c55e" }}
                >
                  {district.completed}
                </span>
                <span
                  className={styles.statusBadge}
                  style={{ backgroundColor: "#f97316" }}
                >
                  {district.pending}
                </span>
                <span
                  className={styles.statusBadge}
                  style={{ backgroundColor: "#ef4444" }}
                >
                  {district.rejected}
                </span>
              </div>
            </div>
          ))}
        </div>

        {Object.keys(districtStats).length > 5 && (
          <div className={styles.buttonWrapper}>
            <button
              className={styles.showAllButton}
              onClick={() => setShowAllDistricts((prev) => !prev)}
            >
              {!showAllDistricts ? "Показать все" : "Свернуть"}
              <ChevronDownIcon
                className={`${styles.buttonIcon} ${
                  showAllDistricts ? styles.iconRotated : ""
                }`}
              />
            </button>
          </div>
        )}
      </div>
    </Block>
  );
};

export default EmployeeStatisticDistricts;
