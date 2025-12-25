import React from "react";
import styles from "./ProfileSectionWrapper.module.css";

export default function ProfileSectionWrapper({ title, Icon, children }) {
  return (
    <div className={styles.section}>
      <h3 className={styles.sectionTitle}>
        <Icon className={styles.icon} />
        {title}
      </h3>
      {children}
    </div>
  );
}
