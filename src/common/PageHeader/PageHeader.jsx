import React from "react";
import styles from "./PageHeader.module.css";
import Block from "../Block/Block";

export default function PageHeader({ title = "", icon = null }) {
  const Icon = icon;

  return (
    <Block>
      <div className={styles.container}>
        {Icon && <Icon className={styles.icon} />}
        <div className={styles.title}>{title}</div>
      </div>
    </Block>
  );
}
