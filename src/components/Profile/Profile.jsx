import React from "react";
import styles from "./Profile.module.css";
import { useAuthStore } from "../../stores/authStore";
import { ReactComponent as UserIcon } from "../../assets/user.svg";
import ProfileAboutSection from "../ProfileSections/ProfileAboutSection";
import ProfileMyAddressesSection from "../ProfileMyAddressesSection/ProfileMyAddressesSection";
import Block from "../../common/Block/Block";
import { useT } from "../../utils/useT";

export default function Profile() {
  const t = useT();
  const user = useAuthStore((store) => store.user);

  return (
    <div className={styles.wrapper}>
      <Block>
        <div className={styles.container}>
          <UserIcon className={styles.icon} />
          <div className={styles.title}>{t("profile.title")}</div>
        </div>
      </Block>
      <ProfileAboutSection user={user} />
      <ProfileMyAddressesSection />
    </div>
  );
}
