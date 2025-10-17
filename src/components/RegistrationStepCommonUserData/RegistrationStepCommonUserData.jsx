import React from "react";
import styles from "./RegistrationStepCommonUserData.module.css";
import InputField from "../InputField/InputField";

export default function RegistrationStepCommonUserData({
  formData,
  setFormData,
  wasSubmited,
  error,
}) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Заполните личные данные</h1>

      <InputField
        label="Фамилия"
        name="surname"
        value={formData.surname}
        onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
        required
        error={wasSubmited ? error.surname : ""}
      />
      <InputField
        label="Имя"
        name="name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
        error={wasSubmited ? error.name : ""}
      />
      <InputField
        label="Отчество"
        name="patronymic"
        value={formData.patronymic}
        onChange={(e) =>
          setFormData({ ...formData, patronymic: e.target.value })
        }
        error={wasSubmited ? error.patronymic : ""}
      />

      {formData.role === "management" && (
        <InputField
          label="Инвайт-код"
          name="invite"
          value={formData.invite}
          onChange={(e) => setFormData({ ...formData, invite: e.target.value })}
          required
        />
      )}
    </div>
  );
}
