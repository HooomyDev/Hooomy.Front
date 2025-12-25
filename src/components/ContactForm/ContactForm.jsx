import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import styles from "./ContactForm.module.css";
import ContactFormTextField from "../ContactFormTextField/ContactFormTextField";
import { useT } from "../../utils/useT";

export default function ContactForm() {
  const t = useT();

  const methods = useForm({
    mode: "onBlur",
    shouldFocusError: true,
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = (data) => {
    console.log("Форма отправлена:", data);

    reset();
  };

  return (
    <FormProvider {...methods}>
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <h3 className={styles.title}>Напишите нам!</h3>

        <ContactFormTextField
          name="name"
          isRequired={true}
          title={t("user.name")}
          placeholder={t("placeholder.name")}
          validation={{
            required: "Пожалуйста, введите имя",
            minLength: {
              value: 2,
              message: "Имя должно содержать минимум 2 символа",
            },
          }}
        />

        <ContactFormTextField
          name="email"
          isRequired={true}
          title={t("user.email")}
          placeholder={t("placeholder.name")}
          type="email"
          validation={{
            required: "Пожалуйста, введите email",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Введите корректный email",
            },
          }}
        />

        <ContactFormTextField
          name="message"
          className={styles.message}
          isRequired={true}
          title={t("user.message")}
          placeholder={t("placeholder.message")}
          type="textarea"
          validation={{
            required: "Пожалуйста, введите сообщение",
            minLength: {
              value: 10,
              message: "Сообщение должно содержать минимум 10 символов",
            },
          }}
        />

        <button type="submit" className={styles.submitButton}>
          {t("user.send")}
        </button>
      </form>
    </FormProvider>
  );
}
