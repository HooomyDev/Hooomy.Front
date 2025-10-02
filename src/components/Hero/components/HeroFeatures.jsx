import styles from "../Hero.module.css";

export function HeroFeatures() {
  const features = [
    "Доступ к документам онлайн",
    "Оплата ЖКУ без комиссии",
    "Уведомления о работах",
  ];

  return (
    <ul className={styles.features}>
      {features.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}
