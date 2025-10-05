import styles from "./Hero.module.css";
import HeroText from "../HeroText/HeroText";
import HeroCard from "../HeroCard/HeroCard";

export default function Hero({ id }) {
  return (
    <section id={id} className={styles.container}>
      <HeroText />
      <HeroCard />
    </section>
  );
}
