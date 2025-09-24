import React from "react";
import styles from "./Contacts.module.css";
import ContactInfo from "../ContactInfo/ContactInfo";
import ContactForm from "../ContactForm/ContactForm";

export default function Contacts({ id }) {
  return (
    <section id={id} className={styles.wrapper}>
      <div className={styles.container}>
        <h2>
          Остались вопросы? <br />
          <span className={styles.span}>Свяжитесь с нами!</span>
        </h2>
        <ContactInfo />
        <ContactForm />
      </div>
    </section>
  );
}
