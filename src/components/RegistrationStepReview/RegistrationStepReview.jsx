import React from "react";
import styles from "./RegistrationStepReview.module.css";

export default function RegistrationStepReview({ formData }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Проверьте введённые данные</h1>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Личные данные</h2>
        <p>
          <strong>Фамилия:</strong> {formData.surname}
        </p>
        <p>
          <strong>Имя:</strong> {formData.name}
        </p>
        {formData.patronymic && (
          <p>
            <strong>Отчество:</strong> {formData.patronymic}
          </p>
        )}
        {formData.invite && (
          <p>
            <strong>Инвайт-код:</strong> {formData.invite}
          </p>
        )}
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Контактные данные</h2>
        <p>
          <strong>Email:</strong> {formData.email}
        </p>
        <p>
          <strong>Пароль:</strong> {formData.password}
        </p>
      </div>
    </div>
  );
}
