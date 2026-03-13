import React from "react";
import styles from "./MainHeroStats.module.css";
import MainHeroStatItem from "../MainHeroStatItem/MainHeroStatItem";
import { useT } from "../../utils/useT";

export default function MainHeroStats() {
  const t = useT();

  const stats = [
    {
      id: 1,
      label: t("main.requests"),
      number: Math.floor(Math.random() * 20000) + 1000,
    },
    {
      id: 2,
      label: t("main.users"),
      number: Math.floor(Math.random() * 50000) + 5000,
    },
  ];

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
