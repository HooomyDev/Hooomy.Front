import React from "react";
import styles from "./RegistrationStepReview.module.css";
import RegistrationStepReviewSection from "../RegistrationStepReviewSection/RegistrationStepReviewSection";
import RegistrationStepReviewField from "../RegistrationStepReviewField/RegistrationStepReviewField";
import { useFormContext } from "react-hook-form";

export default function RegistrationStepReview() {
  const { getValues } = useFormContext();
  const values = getValues();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Проверьте введённые данные</h1>

      <RegistrationStepReviewSection title="Личные данные">
        <RegistrationStepReviewField label="Фамилия" value={values.surname} />
        <RegistrationStepReviewField label="Имя" value={values.name} />
        <RegistrationStepReviewField
          label="Отчество"
          value={values.patronymic}
        />
        {values.role === "management" && (
          <RegistrationStepReviewField
            label="Инвайт-код"
            value={values.invite}
          />
        )}
      </RegistrationStepReviewSection>

      <RegistrationStepReviewSection title="Контактные данные">
        <RegistrationStepReviewField label="Email" value={values.email} />
        <RegistrationStepReviewField label="Пароль" value={values.password} />
      </RegistrationStepReviewSection>
    </div>
  );
}
