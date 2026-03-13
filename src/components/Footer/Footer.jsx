import React from "react";
import FooterColumns from "../FooterColums/FooterColumns";
import FooterBottom from "../FooterBottom/FooterBottom";
import { useFooterColumns } from "../../utils/useFooterColumns";
import styles from "./Footer.module.css";

export default function Footer() {
  const footerColumns = useFooterColumns();

  return (
    <footer className={styles.footer}>
      <FooterColumns columns={footerColumns} />
      <FooterBottom />
    </footer>
  );
}
