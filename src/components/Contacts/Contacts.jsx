import React from "react";
import styles from "./Contacts.module.css";
import ContactInfo from "../ContactInfo/ContactInfo";
import ContactForm from "../ContactForm/ContactForm";
import { useT } from "../../utils/useT";

export default function Contacts() {
  const t = useT();

  return (
    <div className={styles.container}>
      <ContactInfo />
      <ContactForm />
    </div>
  );
}
