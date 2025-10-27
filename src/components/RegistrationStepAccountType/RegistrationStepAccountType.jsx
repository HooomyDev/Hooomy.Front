import React from "react";
import styles from "./RegistrationStepAccountType.module.css";
import RadioButton from "../RadioButton/RadioButton";
import { useFormContext } from "react-hook-form";

export default function RegistrationStepAccountType({ roles }) {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();
  const selectedRole = watch("role");

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Выберите вашу роль</h1>

      {roles.map((role) => (
        <RadioButton
          key={role.value}
          value={role.value}
          label={role.label}
          {...register("role", { required: "Выберите роль" })}
          checked={selectedRole === role.value}
        />
      ))}

      {errors.role && <div className={styles.error}>{errors.role.message}</div>}
    </div>
  );
}
