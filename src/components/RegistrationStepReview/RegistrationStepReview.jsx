import React from "react";
import styles from "./RegistrationStepReview.module.css";
import RegistrationStepReviewSection from "../RegistrationStepReviewSection/RegistrationStepReviewSection";
import RegistrationStepReviewField from "../RegistrationStepReviewField/RegistrationStepReviewField";

export default function RegistrationStepReview({ formData }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Проверьте введённые данные</h1>

      <RegistrationStepReviewSection title="Личные данные">
        <RegistrationStepReviewField label="Фамилия" value={formData.surname} />
        <RegistrationStepReviewField label="Имя" value={formData.name} />
        <RegistrationStepReviewField
          label="Отчество"
          value={formData.patronymic}
        />
        <RegistrationStepReviewField
          label="Инвайт-код"
          value={formData.invite}
        />
      </RegistrationStepReviewSection>

      <RegistrationStepReviewSection title="Контактные данные">
        <RegistrationStepReviewField label="Email" value={formData.email} />
        <RegistrationStepReviewField label="Пароль" value={formData.password} />
      </RegistrationStepReviewSection>
    </div>
  );
}
