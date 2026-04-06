import React from "react";
import styles from "./PageHeader.module.css";
import Block from "../Block/Block";
import { InformationCircleIcon } from "@heroicons/react/24/solid";

export default function PageHeader({ title = "", icon = null, info = null }) {
  const Icon = icon;
  const Info = info;

  return (
    <Block>
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          {Icon && <Icon className={styles.icon} />}
          <div className={styles.title}>{title}</div>
        </div>
        {info && (
          <div className={styles.info}>
            <InformationCircleIcon className={styles.icon} />
            <div className={styles.infoContent}>
              <Info />
            </div>
          </div>
        )}
      </div>
    </Block>
  );
}
