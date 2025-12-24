import React from "react";
import InputField from "../../../common/InputField/InputField";
import { useFormContext } from "react-hook-form";
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from "../../../utils/validation";

export default function RegistrationStepContactUserData() {
  const { watch } = useFormContext();
  const password = watch("password");

  return (
    <div>
      <h1>Укажите контактную информацию</h1>

      <InputField
        label="Email"
        name="email"
        type="email"
        required
        rules={{
          validate: (val) => validateEmail(val) || true,
        }}
      />

      <InputField
        label="Пароль"
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
