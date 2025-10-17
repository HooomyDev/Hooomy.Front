import React from "react";
import styles from "./RegistrationStepContactUserData.module.css";
import InputField from "../InputField/InputField";

export default function RegistrationStepContactUserData({
  formData,
  setFormData,
  wasSubmited,
  error,
}) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Укажите контактную информацию</h1>

      <InputField
        label="Email"
        name="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
        error={wasSubmited ? error.email : ""}
      />
      <InputField
        label="Пароль"
        name="password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        required
        type="password"
        error={wasSubmited ? error.password : ""}
      />
      <InputField
        label="Повторите пароль"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={(e) =>
          setFormData({ ...formData, confirmPassword: e.target.value })
        }
        required
        type="password"
        error={wasSubmited ? error.confirmPassword : ""}
      />
    </div>
  );
}
