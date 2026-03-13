import React from "react";
import styles from "./RegistrationStepAccountType.module.css";
import RadioButton from "../../../common/RadioButton/RadioButton";
import { useFormContext } from "react-hook-form";
import { useT } from "../../../utils/useT";

export default function RegistrationStepAccountType({ roles }) {
  const t = useT();
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();
  const selectedRole = watch("role");

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t("register.step1")}</h1>

      {roles.map((role) => (
        <RadioButton
          key={role.value}
          value={role.value}
          label={role.label}
          {...register("role", { required: t("errors.requiredRole") })}
          checked={selectedRole === role.value}
        />
      ))}

      {errors.role && <div className={styles.error}>{errors.role.message}</div>}
    </div>
  );
}
