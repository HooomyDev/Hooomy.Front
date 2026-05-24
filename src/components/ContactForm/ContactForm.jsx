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
        message: "Обращение успешно принято",
      });
      reset();
    },
    onError: (error) => {
      setNotification({
        type: "error",
        message:
          error.response?.data?.message ||
          "Ошибка при отправке. Попробуйте позже.",
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
        message: "Сообщение должно содержать минимум 3 символа",
      });
      return;
    }

    submitMutation.mutate({ email: data.email, message: data.message });
  };

  return (
    <>
      <FormProvider {...methods}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <h3 className={styles.title}>Напишите нам!</h3>

          <InputField
            label="Email для обратной связи"
            name="email"
            type="email"
            required
            rules={{
              maxLength: 255,
              required: "Email обязателен",
              validate: (value) => {
                const validation = validateEmail(value);
                return validation === true ? undefined : validation;
              },
            }}
            maxLength={250}
          />

          <InputField
            label="Сообщение"
            name="message"
            multiline
            rows={5}
            required
            rules={{
              required: "Сообщение обязательно",
              minLength: {
                value: 3,
                message: "Сообщение должно содержать минимум 3 символа",
              },
              maxLength: {
                value: 2000,
                message: "Сообщение не должно превышать 2000 символов",
              },
            }}
            maxLength={2000}
          />

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Отправка..." : t("user.send")}
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
