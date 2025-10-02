import styles from "../Hero.module.css";
import { HeroName } from "./HeroName";
import { HeroTitle } from "./HeroTitle";
import { HeroSubtext } from "./HeroSubtext";
import { HeroFeatures } from "./HeroFeatures";

export default function HeroText() {
  return (
    <div className={styles.textContainer}>
      <HeroName />
      <HeroTitle />
      <HeroSubtext />
      <HeroFeatures />
    </div>
  );
}
