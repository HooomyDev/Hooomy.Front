import React from "react";
import styles from "./MainHeroStatItem.module.css";
import CountUp from "react-countup";

export default function MainHeroStatItem({ label, number }) {
  return (
    <div className={styles.statItem}>
      <span className={styles.statNumber}>
        <CountUp end={number} duration={2} separator=" " />
      </span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  );
}
