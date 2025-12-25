import React from "react";
import InputField from "../../../common/InputField/InputField";
import { useFormContext } from "react-hook-form";
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from "../../../utils/validation";
import styles from "./RegistrationStepContactUserData.module.css";
import { useT } from "../../../utils/useT";

export default function RegistrationStepContactUserData() {
  const t = useT();
  const { watch } = useFormContext();
  const password = watch("password");

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t("register.step3")}</h1>

      <InputField
        label={t("user.email")}
        placeholder={t("placeholder.email")}
        name="email"
        type="email"
        required
        rules={{
          validate: (val) => validateEmail(val) || true,
        }}
      />

      <InputField
        label={t("user.password")}
        placeholder={t("placeholder.password")}
        name="password"
        type="password"
        required
        isPassword
        rules={{
          validate: (val) => validatePassword(val) || true,
        }}
      />

      <InputField
        label={t("user.confirmPassword")}
        placeholder={t("placeholder.confirmPassword")}
        name="confirmPassword"
        type="password"
        isPassword
        required
        rules={{
          validate: (val) => validateConfirmPassword(password, val) || true,
        }}
      />
    </div>
  );
}
