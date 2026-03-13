import React from "react";
import styles from "./FormHeader.module.css";

export default function FormHeader({ title }) {
  return <div className={styles.title}>{title}</div>;
}
