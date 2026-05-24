import React from "react";
import styles from "./MainHeroStats.module.css";
import MainHeroStatItem from "../MainHeroStatItem/MainHeroStatItem";
import { useT } from "../../utils/useT";
import { getRequestCount } from "../../api/services/requestService";
import { useQuery } from "@tanstack/react-query";
import { getUserCount } from "../../api/services/userService";

export default function MainHeroStats() {
  const t = useT();

  const { data: requestCount } = useQuery({
    queryKey: ["requestCount"],
    queryFn: () => getRequestCount(5),
  });

  const { data: userCount } = useQuery({
    queryKey: ["userCount"],
    queryFn: getUserCount,
  });

  const stats = [
    {
      id: 1,
      label: t("main.requests"),
      number: requestCount,
    },
    {
      id: 2,
      label: t("main.users"),
      number: userCount,
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
