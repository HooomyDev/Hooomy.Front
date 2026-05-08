import React from "react";
import styles from "./ContactInfo.module.css";
import { useT } from "../../utils/useT";

export default function ContactInfo() {
  const t = useT();
  return (
    <div className={styles.container}>
      <div className={styles.title}>Контактная информация</div>
      <p>
        <strong>{t("user.address")}:</strong> {t("address")}
      </p>
      <p>
        <strong>{t("user.phone")}:</strong>{" "}
        <a href="tel:+375445691058">+375 (44) 569-10-58</a>
      </p>
      <p>
        <strong>{t("user.email")}:</strong>{" "}
        <a href="mailto:hooomy.help.by@gmail.com">hooomy.help.by@gmail.com</a>
      </p>
    </div>
  );
}
