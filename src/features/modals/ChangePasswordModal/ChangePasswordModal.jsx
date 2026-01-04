import React from "react";
import styles from "./ChangePasswordModal.module.css";
import { useForm, FormProvider } from "react-hook-form";
import InputField from "../../common/InputField/InputField";
import {
  validatePassword,
  validateConfirmPassword,
} from "../../utils/validation";
import { useT } from "../../utils/useT";

export default function ChangePasswordModal({ onSuccess }) {
  const t = useT();

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
      <h3 className={styles.title}>{t("modal.changePassword")}</h3>
      <form onSubmit={methods.handleSubmit(onSubmit)} className={styles.form}>
        <InputField
          label={t("user.oldPassword")}
          name="oldPassword"
          placeholder={t("placeholder.oldPassword")}
          type="password"
          required
          rules={{ required: t("errors.oldPassword.empty") }}
        />

        <InputField
          label={t("user.newPassword")}
          name="newPassword"
          placeholder={t("placeholder.newPassword")}
          type="password"
          required
          rules={{
            validate: (value) => validatePassword(value) || true,
          }}
        />

        <InputField
          label={t("user.confirmNewPassword")}
          name="confirmPassword"
          placeholder={t("placeholder.confirmNewPassword")}
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
          {t("user.save")}
        </button>
      </form>
    </FormProvider>
  );
}
