import React from "react";
import styles from "./MainHeroStats.module.css";
import MainHeroStatItem from "../MainHeroStatItem/MainHeroStatItem";

const stats = [
  { id: 1, label: "Проблем решено", number: 13452 },
  { id: 2, label: "Пользователей с нами", number: 34235 },
];

export default function MainHeroStats() {
  return (
    <div className={styles.stats}>
      {stats.map((stat) => (
        <MainHeroStatItem
          key={stat.id}
          label={stat.label}
          number={stat.number}
        />
      ))}
    </div>
  );
}
