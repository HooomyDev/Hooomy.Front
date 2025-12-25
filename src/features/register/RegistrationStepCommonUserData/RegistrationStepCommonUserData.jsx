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
        placeholder="Введите вашу фамилию"
        name="surname"
        rules={{
          validate: (val) => validateSurname(val) || true,
        }}
      />

      <InputField
        required
        label="Имя"
        placeholder="Введите ваше имя"
        name="name"
        rules={{
          validate: (val) => validateName(val) || true,
        }}
      />

      <InputField
        label="Отчество"
        placeholder="Введите ваше отчество"
        name="patronymic"
        rules={{
          validate: (val) => validatePatronymic(val) || true,
        }}
      />

      {role === "management" && (
        <InputField
          required
          label="Инвайт-код"
          placeholder="Введите ваш код"
          name="invite"
          rules={{
            required: "Введите инвайт-код",
          }}
        />
      )}
    </div>
  );
}
