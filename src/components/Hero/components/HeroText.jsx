import styles from "../Hero.module.css";
import { HeroName } from "./HeroName";
import { HeroTitle } from "./HeroTitle";
import { HeroSubtext } from "./HeroSubtext";
import { NavLink } from "react-router-dom";

export default function HeroText() {
  return (
    <div className={styles.textContainer}>
      <HeroName />
      <HeroTitle />
      <HeroSubtext />
      <NavLink to="/register" className={styles.tryButton}>
        Попробовать
      </NavLink>
    </div>
  );
}
