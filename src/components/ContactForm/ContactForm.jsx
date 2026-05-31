import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import styles from "./ContactForm.module.css";
import { useT } from "../../utils/useT";
import Button from "../../common/Button/Button";
import InputField from "../../common/InputField/InputField";
import { validateEmail } from "../../utils/validation";
import { useMutation } from "@tanstack/react-query";
import { createInquiry } from "../../api/services/inquiryService";
import Notification from "../../common/Notification/Notification";

export default function ContactForm() {
  const t = useT();
  const [notification, setNotification] = useState(null);

  const methods = useForm({
    defaultValues: {
      email: "",
      message: "",
    },
    mode: "onBlur",
    shouldFocusError: true,
  });

  const {
    handleSubmit,
    reset,
    setError,
    formState: { isSubmitting },
  } = methods;

  const submitMutation = useMutation({
    mutationKey: ["createInquiry"],
    mutationFn: async ({ email, message }) =>
      await createInquiry(email, message),
    onSuccess: () => {
      setNotification({
        type: "success",
        message: t("main.contacts.successMessage"),
      });
      reset();
    },
    onError: (error) => {
      setNotification({
        type: "error",
        message:
          error.response?.data?.message || t("main.contacts.submitError"),
      });
    },
  });

  const onSubmit = async (data) => {
    // Валидация email
    const emailValidation = validateEmail(data.email);
    if (emailValidation !== true) {
      setError("email", {
        type: "manual",
        message: emailValidation,
      });
      return;
    }

    // Валидация сообщения
    if (!data.message || data.message.trim().length < 3) {
      setError("message", {
        type: "manual",
        message: t("main.contacts.errorMessageTooShort"),
      });
      return;
    }

    submitMutation.mutate({ email: data.email, message: data.message });
  };

  return (
    <>
      <FormProvider {...methods}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <h3 className={styles.title}>{t("main.contacts.writeUs")}</h3>

          <InputField
            label={t("main.contacts.emailLabel")}
            name="email"
            type="email"
            required
            placeholder={t("placeholder.email")}
            rules={{
              maxLength: 255,
              required: t("errors.email.empty"),
              validate: (value) => {
                const validation = validateEmail(value);
                return validation === true ? undefined : validation;
              },
            }}
            maxLength={250}
          />

          <InputField
            label={t("main.contacts.messageLabel")}
            name="message"
            multiline
            rows={5}
            required
            placeholder={t("placeholder.message")}
            rules={{
              required: t("main.contacts.errorMessageRequired"),
              minLength: {
                value: 3,
                message: t("main.contacts.errorMessageTooShort"),
              },
              maxLength: {
                value: 2000,
                message: t("main.contacts.errorMessageTooLong"),
              },
            }}
            maxLength={2000}
          />

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? t("main.contacts.sending") : t("user.send")}
          </Button>
        </form>
      </FormProvider>

      {notification && (
        <Notification
          duration={3000}
          onClose={() => setNotification(null)}
          type={notification.type}
        >
          {notification.message}
        </Notification>
      )}
    </>
  );
}
