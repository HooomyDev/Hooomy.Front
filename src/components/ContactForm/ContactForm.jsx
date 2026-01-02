import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import styles from "./ContactForm.module.css";
import ContactFormTextField from "../ContactFormTextField/ContactFormTextField";
import { useT } from "../../utils/useT";
import Button from "../../common/Button/Button";

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
            required: t("errors.name.empty"),
            minLength: {
              value: 2,
              message: t("errors.name.short"),
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
            required: t("errors.email.empty"),
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: t("errors.email.format"),
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
            required: t("errors.message.empty"),
            minLength: {
              value: 10,
              message: t("errors.message.short"),
            },
          }}
        />

        <Button type="submit">{t("user.send")}</Button>
      </form>
    </FormProvider>
  );
}
