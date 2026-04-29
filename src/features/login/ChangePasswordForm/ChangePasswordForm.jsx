import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../stores/authStore";
import { changePassword } from "../../../api/services/userService";
import {
  validatePassword,
  validateConfirmPassword,
} from "../../../utils/validation";
import InputField from "../../../common/InputField/InputField";
import Button from "../../../common/Button/Button";
import FormHeader from "../../../components/FormHeader/FormHeader";
import Notification from "../../../common/Notification/Notification";
import routes from "../../../stores/routes.json";
import styles from "./ChangePasswordForm.module.css";

export default function ChangePasswordForm() {
  const navigate = useNavigate();
  const login = useAuthStore((store) => store.login);
  const user = useAuthStore((store) => store.user);
  const [notification, setNotification] = useState(null);

  const methods = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      email: user?.email,
    },
  });

  const { watch } = methods;

  const mutation = useMutation({
    mutationFn: (data) =>
      changePassword(data.currentPassword, data.newPassword, user?.email),
    onSuccess: () => {
      // сбрасываем флаг в сторе
      login({ ...user, mustChangePassword: false });
      navigate(user.role === "Admin" ? routes.adminDashboard : routes.home);
    },
    onError: (error) => {
      setNotification({
        type: "error",
        message:
          error.response?.data?.errors?.[0]?.description ??
          "Ошибка смены пароля",
      });
    },
  });

  return (
    <div className={styles.wrapper}>
      {notification && (
        <Notification
          duration={4000}
          onClose={() => setNotification(null)}
          type={notification.type}
        >
          {notification.message}
        </Notification>
      )}

      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) => mutation.mutate(data))}
          className={styles.form}
        >
          <FormHeader title="Смена пароля" />
          <InputField
            name="currentPassword"
            label="Текущий пароль"
            type="password"
            placeholder="Введите текущий пароль"
            rules={{ required: "Обязательное поле" }}
            required
          />
          <InputField
            name="newPassword"
            label="Новый пароль"
            type="password"
            placeholder="Минимум 6 символов"
            rules={{
              required: "Обязательное поле",
              validate: (v) => validatePassword(v),
            }}
            required
          />
          <InputField
            name="confirmPassword"
            label="Подтвердите пароль"
            type="password"
            placeholder="Повторите новый пароль"
            rules={{
              required: "Обязательное поле",
              validate: (v) => validateConfirmPassword(watch("newPassword"), v),
            }}
            required
          />

          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Сохранение..." : "Сменить пароль"}
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}
