import React from "react";
import styles from "./ChangePasswordModal.module.css";
import { useForm, FormProvider } from "react-hook-form";
import InputField from "../../common/InputField/InputField";
import {
  validatePassword,
  validateConfirmPassword,
} from "../../utils/validation";

export default function ChangePasswordModal({ onSuccess }) {
  const methods = useForm({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Change password data:", data);
    onSuccess();
  };

  return (
    <FormProvider {...methods}>
      <h3 className={styles.title}>Смена пароля</h3>
      <form onSubmit={methods.handleSubmit(onSubmit)} className={styles.form}>
        <InputField
          label="Старый пароль"
          name="oldPassword"
          type="password"
          required
          rules={{ required: "Введите старый пароль" }}
        />

        <InputField
          label="Новый пароль"
          name="newPassword"
          type="password"
          required
          rules={{
            validate: (value) => validatePassword(value) || true,
          }}
        />

        <InputField
          label="Подтверждение пароля"
          name="confirmPassword"
          type="password"
          required
          rules={{
            validate: (value) =>
              validateConfirmPassword(
                methods.getValues("newPassword"),
                value
              ) || true,
          }}
        />

        <button type="submit" className={styles.submitButton}>
          Сохранить
        </button>
      </form>
    </FormProvider>
  );
}
