import React, { useState } from "react";
import { forgotPassword } from "../../../api/services/userService";
import styles from "./ForgotPassword.module.css";
import { FormProvider, useForm } from "react-hook-form";
import InputField from "../../../common/InputField/InputField";
import Button from "../../../common/Button/Button";
import { useMutation } from "@tanstack/react-query";
import LinkTo from "../../../common/LinkTo/LinkTo";

export default function ForgotPassword() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const methods = useForm({
    defaultValues: { email: "" },
  });
  const { handleSubmit, reset, watch } = methods;
  const email = watch("email");

  const forgotPasswordMutation = useMutation({
    mutationFn: (email) => forgotPassword(email),
    onSuccess: (data) => {
      setMessage(data.message);
      reset({ email: "" });
      setError("");
    },
    onError: (error) => {
      setError(error.response?.data?.message || "Произошла ошибка");
      setMessage("");
    },
  });

  const onSubmit = (data) => {
    if (!data.email.trim()) return;
    forgotPasswordMutation.mutate(data.email);
  };

  return (
    <div className={styles.container}>
      <FormProvider {...methods}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.header}>Восстановление пароля</div>
          <div className={styles.text}>
            Введите email, указанный при регистрации. Мы отправим ссылку для
            сброса пароля.
          </div>

          <InputField
            name="email"
            type="email"
            placeholder="Email"
            required
            rules={{
              required: "Email обязателен",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Некорректный email",
              },
            }}
          />

          <Button
            type="submit"
            disabled={forgotPasswordMutation.isPending || !email?.trim()}
          >
            {forgotPasswordMutation.isPending
              ? "Отправка..."
              : "Отправить ссылку"}
          </Button>

          {message && <p className={styles.success}>{message}</p>}
          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.backToLogin}>
            <LinkTo label={"Вернуться ко входу"} link={"/login"} />
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
