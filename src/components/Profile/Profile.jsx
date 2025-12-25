import React from "react";
import styles from "./Profile.module.css";
import { useAuthStore } from "../../stores/authStore";
import ProfileAboutSection from "../ProfileSections/ProfileAboutSection";
import ProfileMyAddressesSection from "../ProfileMyAddressesSection/ProfileMyAddressesSection";

export default function Profile() {
  const user = useAuthStore((store) => store.user);

  return (
    <div className={styles.wrapper}>
      <ProfileAboutSection user={user} />
      <ProfileMyAddressesSection />
    </div>
  );
}
