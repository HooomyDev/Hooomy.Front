import styles from "./Hero.module.css";
import HeroText from "./components/HeroText";
import Card from "../Card/Card";

export default function Hero({ id }) {
  return (
    <section id={id} className={styles.container}>
      <HeroText />
      <Card />
    </section>
  );
}
