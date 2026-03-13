import React from "react";
import styles from "./FooterBottom.module.css";
import { useT } from "../../utils/useT";

export default function FooterBottom() {
  const t = useT();

  return <div className={styles.bottom}>{t("footer.bottom")}</div>;
}
