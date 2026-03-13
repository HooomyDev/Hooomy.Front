import React from "react";
import CountUp from "react-countup";
import Block from "../../../common/Block/Block";
import styles from "./AdminDashboardStatCards.module.css";

export default function AdminDashboardStatCards({ cards = [] }) {
  return (
    <div className={styles.cards}>
      {cards.map((card) => (
        <Block key={card.id} title={card.label} Icon={card.icon}>
          <div className={styles.card}>
            <CountUp end={card.value} duration={2} separator=" " />
          </div>
        </Block>
      ))}
    </div>
  );
}
