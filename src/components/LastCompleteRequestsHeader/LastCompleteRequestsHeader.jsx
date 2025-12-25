import React from "react";
import styles from "./LastCompleteRequestsHeader.module.css";
import { useT } from "../../utils/useT";

export default function LastCompleteRequestsHeader() {
  const t = useT();

  return <h2 className={styles.title}>{t("main.lastrequests")}</h2>;
}
