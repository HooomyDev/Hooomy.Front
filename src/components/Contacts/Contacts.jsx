import React from "react";
import styles from "./Contacts.module.css";
import ContactInfo from "../ContactInfo/ContactInfo";
import ContactForm from "../ContactForm/ContactForm";
import { useT } from "../../utils/useT";

export default function Contacts() {
  const t = useT();

  return (
    <div className={styles.container}>
      <h2>
        {t("main.contacts.haveQuest")} <br />
        <span className={styles.span}>{t("main.contacts.writeUs")}</span>
      </h2>
      <ContactInfo />
      <ContactForm />
    </div>
  );
}
