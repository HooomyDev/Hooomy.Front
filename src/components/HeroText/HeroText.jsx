import styles from "./HeroText.module.css";
import HeroName from "../HeroName/HeroName";
import HeroTitle from "../HeroTitle/HeroTitle";
import HeroSubtext from "../HeroSubtext/HeroSubtext";
import TryButton from "../TryButton/TryButton";

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
