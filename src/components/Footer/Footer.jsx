import React from "react";
import FooterColumn from "../FooterColumn/FooterColumn";
import { footerColumns } from "./FooterData";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.columns}>
        {footerColumns.map((col, index) => (
          <FooterColumn key={index} title={col.title} items={col.items} />
        ))}
      </div>
      <div className={styles.bottom}>© Hooomy | Все права защищены</div>
    </footer>
  );
}
