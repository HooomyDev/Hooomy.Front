import React from "react";
import styles from "./PageWrapper.module.css";
import { Snowfall } from "react-snowfall";

export default function PageWrapper({ children }) {
  return (
    <>
      <Snowfall color="#fff" />
      <div className={styles.wrapper}>{children}</div>
    </>
  );
}
