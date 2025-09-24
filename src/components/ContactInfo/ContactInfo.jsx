import React from "react";
import styles from "./ContactInfo.module.css";

export default function ContactInfo() {
  return (
    <div className={styles.container}>
      <p>
        <strong>Адрес:</strong> г. Минск, ул. Пономаренко, 35А, оф. 208, БЦ
        «Инфо»
      </p>
      <p>
        <strong>Телефон:</strong>{" "}
        <a href="tel:+375445691058">+375 (44) 569-10-58</a>
      </p>
      <p>
        <strong>Email:</strong>{" "}
        <a href="mailto:hooomy.help.by@gmail.com">hooomy.help.by@gmail.com</a>
      </p>
    </div>
  );
}
