import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../../../api/services/userService";
import styles from "./ResetPassword.module.css";
import { FormProvider, useForm } from "react-hook-form";
import InputField from "../../../common/InputField/InputField";
import Button from "../../../common/Button/Button";
import { useMutation } from "@tanstack/react-query";
import LinkTo from "../../../common/LinkTo/LinkTo";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  useEffect(() => {
    if (!token || !email) {
      navigate("/login");
    }
  }, [token, email, navigate]);

  const methods = useForm({
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });
  const { handleSubmit, watch, reset } = methods;
  const newPassword = watch("newPassword");
  const confirmPassword = watch("confirmPassword");

  const resetPasswordMutation = useMutation({
    mutationFn: (data) => resetPassword(data),
    onSuccess: () => {
      setSuccess(true);
      reset({ newPassword: "", confirmPassword: "" });
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    },
    onError: (error) => {
      setError(error.response?.data?.message || "Ошибка при сбросе пароля");
    },
  });

  const onSubmit = (data) => {
    if (data.newPassword !== data.confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }

    if (data.newPassword.length < 6) {
      setError("Пароль должен содержать минимум 6 символов");
      return;
    }

    setError("");
    resetPasswordMutation.mutate({
      token,
      email,
      newPassword: data.newPassword,
      confirmPassword: data.confirmPassword,
    });
  };

  if (success) {
    return (
      <div className={styles.container}>
        <div className={styles.form}>
          <div className={styles.header}>Пароль изменён</div>
          <div className={styles.text}>
            Ваш пароль успешно изменён. Перенаправление на страницу входа...
          </div>
          <div className={styles.backToLogin}>
            <LinkTo label={"Перейти ко входу"} link={"/login"} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <FormProvider {...methods}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.header}>Создание нового пароля</div>
          <div className={styles.text}>
            Придумайте новый пароль для входа в аккаунт
          </div>

          <InputField
            name="newPassword"
            type="password"
            placeholder="Новый пароль"
            required
            rules={{
              required: "Введите новый пароль",
              minLength: {
                value: 6,
                message: "Пароль должен содержать минимум 6 символов",
              },
            }}
          />

          <InputField
            name="confirmPassword"
            type="password"
            placeholder="Подтвердите пароль"
            required
            rules={{
              required: "Подтвердите пароль",
              validate: (value) =>
                value === watch("newPassword") || "Пароли не совпадают",
            }}
          />

          <Button
            type="submit"
            disabled={
              resetPasswordMutation.isPending ||
              !newPassword?.trim() ||
              !confirmPassword?.trim() ||
              newPassword !== confirmPassword
            }
          >
            {resetPasswordMutation.isPending
              ? "Сохранение..."
              : "Сохранить пароль"}
          </Button>

          {error && <p className={styles.error}>{error}</p>}
        </form>
      </FormProvider>
    </div>
  );
}
