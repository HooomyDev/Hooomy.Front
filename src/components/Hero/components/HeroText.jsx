import styles from "../Hero.module.css";
import { HeroName } from "./HeroName";
import { HeroTitle } from "./HeroTitle";
import { HeroSubtext } from "./HeroSubtext";
import TryButton from "../../TryButton/TryButton";

export default function HeroText() {
  return (
    <div className={styles.textContainer}>
      <HeroName />
      <HeroTitle />
      <HeroSubtext />
      <TryButton />
    </div>
  );
}
