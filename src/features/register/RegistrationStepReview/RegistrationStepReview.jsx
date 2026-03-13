import React from "react";
import styles from "./RegistrationStepReview.module.css";
import RegistrationStepReviewSection from "../RegistrationStepReviewSection/RegistrationStepReviewSection";
import RegistrationStepReviewField from "../RegistrationStepReviewField/RegistrationStepReviewField";
import { useFormContext } from "react-hook-form";
import { useT } from "../../../utils/useT";

export default function RegistrationStepReview() {
  const t = useT();
  const { getValues } = useFormContext();
  const values = getValues();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t("register.step4")}</h1>

      <RegistrationStepReviewSection title={t("register.step4About")}>
        <RegistrationStepReviewField
          label={t("user.surname")}
          value={values.surname}
        />
        <RegistrationStepReviewField
          label={t("user.name")}
          value={values.name}
        />
        <RegistrationStepReviewField
          label={t("user.patronymic")}
          value={values.patronymic}
        />
        {values.role === "management" && (
          <RegistrationStepReviewField
            label={t("user.invite")}
            value={values.invite}
          />
        )}
      </RegistrationStepReviewSection>

      <RegistrationStepReviewSection title={t("register.step4Contact")}>
        <RegistrationStepReviewField
          label={t("user.email")}
          value={values.email}
        />
        <RegistrationStepReviewField
          label={t("user.password")}
          value={values.password}
        />
      </RegistrationStepReviewSection>
    </div>
  );
}
