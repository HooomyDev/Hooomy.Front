import React from "react";
import styles from "./ContactForm.module.css";
import ContactFormTextField from "../ContactFormTextField/ContactFormTextField";

export default function ContactForm() {
  return (
    <form className={styles.form}>
      <h3 className={styles.title}>Напишите нам!</h3>
      <ContactFormTextField
        isRequired={true}
        title="Имя"
        placeholder="Введите ваше имя"
      />
      <ContactFormTextField
        isRequired={true}
        title="Email"
        placeholder="Введите ваш email"
      />
      <ContactFormTextField
        className={styles.message}
        isRequired={true}
        title="Сообщение"
        placeholder="Напишите что-нибудь"
        type="textarea"
        name="message"
      />

      <button type="submit" className={styles.submitButton}>
        Отправить
      </button>
    </form>
  );
}
