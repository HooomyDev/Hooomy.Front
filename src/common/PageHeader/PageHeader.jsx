import React from "react";
import styles from "./PageHeader.module.css";
import Block from "../Block/Block";

export default function PageHeader({ title = "", icon }) {
  const Icon = icon || null;

  return (
    <Block>
      <div className={styles.container}>
        <Icon className={styles.icon} />
        <div className={styles.title}>{title}</div>
      </div>
    </Block>
  );
}
