import React from "react";
import InputField from "../../../common/InputField/InputField";
import { useFormContext } from "react-hook-form";
import {
  validateName,
  validateSurname,
  validatePatronymic,
} from "../../../utils/validation";
import { useT } from "../../../utils/useT";

export default function RegistrationStepCommonUserData() {
  const t = useT();
  const { watch } = useFormContext();
  const role = watch("role");

  return (
    <div>
      <h1>{t("register.step2")}</h1>

      <InputField
        required
        label={t("user.surname")}
        placeholder={t("placeholder.surname")}
        name="surname"
        rules={{
          validate: (val) => validateSurname(val) || true,
        }}
      />

      <InputField
        required
        label={t("user.name")}
        placeholder={t("placeholder.name")}
        name="name"
        rules={{
          validate: (val) => validateName(val) || true,
        }}
      />

      <InputField
        label={t("user.patronymic")}
        placeholder={t("placeholder.patronymic")}
        name="patronymic"
        rules={{
          validate: (val) => validatePatronymic(val) || true,
        }}
      />

      {role === "management" && (
        <InputField
          required
          label={t("user.invite")}
          placeholder={t("placeholder.invite")}
          name="invite"
          rules={{
            required: "Введите инвайт-код",
          }}
        />
      )}
    </div>
  );
}
