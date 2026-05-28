import React from "react";
import styles from "./Home.module.css";
import GuestBanner from "../GuestBanner/GuestBanner";
import MainHero from "../MainHero/MainHero";
import FAQSlider from "../FAQSlider/FAQSlider";
import Contacts from "../Contacts/Contacts";
import { useAuthStore } from "../../stores/authStore";
import SearchHouse from "../SearchHouse/SearchHouse";

export default function Home() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className={styles.wrapper}>
      <GuestBanner user={user} />
      <MainHero />
      <SearchHouse />
      <FAQSlider />
      <Contacts />
    </div>
  );
}
