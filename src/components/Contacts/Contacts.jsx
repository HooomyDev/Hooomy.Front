import React from "react";
import styles from "./Contacts.module.css";
import ContactInfo from "../ContactInfo/ContactInfo";
import ContactForm from "../ContactForm/ContactForm";

export default function Contacts() {
  return (
    <div className={styles.container}>
      <ContactInfo />
      <ContactForm />
    </div>
  );
}
