import React from "react";
import styles from "./MainHeroStats.module.css";
import MainHeroStatItem from "../MainHeroStatItem/MainHeroStatItem";

const stats = [
  {
    id: 1,
    label: "Проблем решено",
    number: Math.floor(Math.random() * 20000) + 1000,
  },
  {
    id: 2,
    label: "Пользователей с нами",
    number: Math.floor(Math.random() * 50000) + 5000,
  },
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
