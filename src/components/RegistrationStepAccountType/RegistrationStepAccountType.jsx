import React from "react";
import styles from "./RegistrationStepAccountType.module.css";
import RadioButton from "../RadioButton/RadioButton";

export default function RegistrationStepAccountType({
  roles,
  formData,
  setFormData,
}) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Выберите вашу роль</h1>

      {roles.map((role) => (
        <RadioButton
          key={role.value}
          name="accountType"
          value={role.value}
          label={role.label}
          checked={formData.role === role.value}
          onChange={(e) => setFormData({ ...formData, role: role.value })}
        />
      ))}
    </div>
  );
}
