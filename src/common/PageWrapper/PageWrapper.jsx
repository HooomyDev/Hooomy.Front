import React from "react";
import styles from "./PageWrapper.module.css";
import { Snowfall } from "react-snowfall";

export default function PageWrapper({ children }) {
  return (
    <>
      <Snowfall color="#ff00e1" />
      <div className={styles.wrapper}>{children}</div>
    </>
  );
}
