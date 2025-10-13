import React from "react";
import styles from "./RegistrationStepCommonUserData.module.css";
import InputField from "../InputField/InputField";

export default function RegistrationStepCommonUserData({
  role,
  formData,
  setFormData,
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
      />
      <InputField
        label="Имя"
        name="name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <InputField
        label="Отчество"
        name="patronymic"
        value={formData.patronymic}
        onChange={(e) =>
          setFormData({ ...formData, patronymic: e.target.value })
        }
      />

      {role === "management" && (
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
