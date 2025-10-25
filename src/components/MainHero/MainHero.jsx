import React from "react";
import { ReactComponent as MascotIcon } from "../../assets/mascot.svg";
import MainHeroContent from "../MainHeroContent/MainHeroContent";
import MainHeroTitle from "../MainHeroTitle/MainHeroTitle";
import MainHeroStats from "../MainHeroStats/MainHeroStats";
import MainHeroCTAButton from "../MainHeroCTAButton/MainHeroCTAButton";
import styles from "./MainHero.module.css";

export default function MainHero() {
  return (
    <div className={styles.wrapper}>
      <MascotIcon className={styles.image} />
      <MainHeroContent>
        <MainHeroTitle />
        <MainHeroStats />
        <MainHeroCTAButton />
      </MainHeroContent>
    </div>
  );
}
