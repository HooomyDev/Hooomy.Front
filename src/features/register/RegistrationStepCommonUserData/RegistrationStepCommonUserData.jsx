import React from "react";
import InputField from "../../../common/InputField/InputField";
import { useFormContext } from "react-hook-form";
import {
  validateName,
  validateSurname,
  validatePatronymic,
} from "../../../utils/validation";

export default function RegistrationStepCommonUserData() {
  const { watch } = useFormContext();
  const role = watch("role");

  return (
    <div>
      <h1>Заполните личные данные</h1>

      <InputField
        required
        label="Фамилия"
        name="surname"
        rules={{
          validate: (val) => validateSurname(val) || true,
        }}
      />

      <InputField
        required
        label="Имя"
        name="name"
        rules={{
          validate: (val) => validateName(val) || true,
        }}
      />

      <InputField
        label="Отчество"
        name="patronymic"
        rules={{
          validate: (val) => validatePatronymic(val) || true,
        }}
      />

      {role === "management" && (
        <InputField
          required
          label="Инвайт-код"
          name="invite"
          rules={{
            required: "Введите инвайт-код",
          }}
        />
      )}
    </div>
  );
}
