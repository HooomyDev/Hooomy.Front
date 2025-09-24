import React from "react";
import styles from "./Hero.module.css";
import Card from "../Card/Card";

export default function Hero({ id }) {
  return (
    <section id={id} className={styles.container}>
      <div className={styles.textContainer}>
        <p className={styles.name}>ЕДИНАЯ ПЛАТФОРМА ЖКХ</p>
        <h1 className={styles.title}>
          Платежи, заявки, документы и новости — без очередей и лишних звонков
        </h1>

        <p className={styles.subtext}>Минск в порядке — благодаря вам!</p>

        <ul className={styles.features}>
          <li>Доступ к документам онлайн</li>
          <li>Оплата ЖКУ без комиссии</li>
          <li>Уведомления о работах</li>
        </ul>
      </div>

      <Card />
    </section>
  );
}
