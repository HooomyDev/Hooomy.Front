import React from "react";
import styles from "./Home.module.css";
import GuestBanner from "../GuestBanner/GuestBanner";
import MainHero from "../MainHero/MainHero";
import LastCompleteRequests from "../LastCompleteRequests/LastCompleteRequests";
import Contacts from "../Contacts/Contacts";
import { useAuthStore } from "../../stores/authStore";

export default function Home() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className={styles.wrapper}>
      <GuestBanner user={user} />
      <MainHero />
      <LastCompleteRequests />
      <Contacts />
    </div>
  );
}
