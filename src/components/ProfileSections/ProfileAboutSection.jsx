import React, { useState } from "react";
import styles from "./ProfileAboutSection.module.css";
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
import Modal from "../../modals/Modal/Modal";
import ChangePasswordModal from "../../modals/ChangePasswordModal/ChangePasswordModal";
import ProfileSectionWrapper from "../ProfileSectionWrapper/ProfileSectionWrapper";

export default function ProfileAboutSection({ user }) {
  const [isOpenModal, setIsOpenModal] = useState(false);

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

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  return (
    <ProfileSectionWrapper title="Личная информация" Icon={IdentificationIcon}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className={styles.form}>
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
                mask="+{375} (00) 000-00-00"
                placeholder="+375 (__) ___-__-__"
              />
            </div>
          </div>

          <div className={styles.buttons}>
            <button
              type="button"
              className={`${styles.button} ${styles.changePasswordButton}`}
              onClick={() => setIsOpenModal(true)}
            >
              Изменить пароль
            </button>

            <button type="submit" className={`${styles.button}`}>
              Сохранить
            </button>
          </div>
        </form>
      </FormProvider>
      <Modal isOpen={isOpenModal} onClose={handleCloseModal}>
        <ChangePasswordModal onSuccess={handleCloseModal} />
      </Modal>
    </ProfileSectionWrapper>
  );
}
