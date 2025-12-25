import React from "react";
import InputField from "../../../common/InputField/InputField";
import { useFormContext } from "react-hook-form";
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from "../../../utils/validation";
import styles from "./RegistrationStepContactUserData.module.css";

export default function RegistrationStepContactUserData() {
  const { watch } = useFormContext();
  const password = watch("password");

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Укажите контактную информацию</h1>

      <InputField
        label="Email"
        placeholder="Введите ваш email"
        name="email"
        type="email"
        required
        rules={{
          validate: (val) => validateEmail(val) || true,
        }}
      />

      <InputField
        label="Пароль"
        placeholder="Введите ваш пароль"
        name="password"
        type="password"
        required
        isPassword
        rules={{
          validate: (val) => validatePassword(val) || true,
        }}
      />

      <InputField
        label="Повторите пароль"
        placeholder="Введите ваш email ещё раз"
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
