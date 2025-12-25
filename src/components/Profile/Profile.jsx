import React from "react";
import styles from "./Profile.module.css";
import { useAuthStore } from "../../stores/authStore";
import { IdentificationIcon } from "@heroicons/react/24/solid";
import { useForm, FormProvider } from "react-hook-form";
import InputField from "../../common/InputField/InputField";
import {
  validateName,
  validateEmail,
  validateSurname,
  validatePatronymic,
} from "../../utils/validation";
import MaskedInputField from "../../common/InputField/MaskedInput";

export default function Profile() {
  const user = useAuthStore((store) => store.user);

  const methods = useForm({
    defaultValues: {
      email: user?.email || "",
      name: user?.name || "",
      phone: user?.phone || "",
      password: user?.password,
      about: user?.about || "",
    },
  });

  const onSubmit = (data) => {
    console.log("Form data:", data);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          <IdentificationIcon className={styles.icon} />
          Личная информация
        </h3>

        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className={styles.form}
          >
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <InputField
                  label="Имя"
                  name="name"
                  placeholder="Имя"
                  required
                  rules={{
                    validate: (value) => validateName(value) || true,
                  }}
                />
              </div>

              <div className={styles.formGroup}>
                <InputField
                  label="Фамилия"
                  name="surname"
                  placeholder="Фамилия"
                  required
                  rules={{
                    validate: (value) => validateSurname(value) || true,
                  }}
                />
              </div>

              <div className={styles.formGroup}>
                <InputField
                  label="Отчество"
                  placeholder="Отчество"
                  name="patronymic"
                  rules={{
                    validate: (value) => validatePatronymic(value) || true,
                  }}
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <InputField
                  label="Почта"
                  name="email"
                  type="email"
                  placeholder="Введите вашу почту сюда"
                  required
                  rules={{
                    validate: (value) => validateEmail(value) || true,
                  }}
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <MaskedInputField
                  label="Телефон"
                  name="phone"
                  required
                  mask="+{375} (00) 000-00-00"
                  placeholder="+375 (__) ___-__-__"
                  rules={{ required: "Телефон обязателен" }}
                />
              </div>
            </div>

            <div className={styles.buttons}>
              <button
                type="button"
                className={`${styles.button} ${styles.changePasswordButton}`}
              >
                Изменить пароль
              </button>

              <button type="submit" className={`${styles.button}`}>
                Сохранить
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
