import React from "react";
import Option from "../Options/Option";
import styles from "./Card.module.css";

export default function Card() {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Доступно всем!</h3>

      <Option
        number="1"
        title="Жители"
        subtitle="Оплата счетов, документы, новости..."
      />
      <Option
        number="2"
        title="УК/ЖЭС"
        subtitle="Управление, обработка заявок..."
      />
      <Option number="3" title="ЖРЭО" subtitle="Курирование, отчётность..." />
      <Option
        number="4"
        title="Мингорисполком"
        subtitle="Минск, тарифы, нормативы..."
      />
    </div>
  );
}
