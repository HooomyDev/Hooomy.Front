import React, { useState } from "react";
import styles from "./ProfileAboutSection.module.css";
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
import Block from "../../common/Block/Block";
import { IdentificationIcon } from "@heroicons/react/24/solid";
import { useT } from "../../utils/useT";

export default function ProfileAboutSection({ user }) {
  const t = useT();
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
    <Block title={t("profile.about")} Icon={IdentificationIcon}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <InputField
                label={t("user.name")}
                name="name"
                placeholder={t("placeholder.name")}
                required
                rules={{
                  validate: (value) => validateName(value) || true,
                }}
              />
            </div>

            <div className={styles.formGroup}>
              <InputField
                label={t("user.surname")}
                name="surname"
                placeholder={t("placeholder.surname")}
                required
                rules={{
                  validate: (value) => validateSurname(value) || true,
                }}
              />
            </div>

            <div className={styles.formGroup}>
              <InputField
                label={t("user.patronymic")}
                placeholder={t("placeholder.patronymic")}
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
                label={t("user.email")}
                name="email"
                type="email"
                placeholder={t("placeholder.email")}
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
                label={t("user.phone")}
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
              {t("profile.changePassword")}
            </button>

            <button type="submit" className={`${styles.button}`}>
              {t("user.save")}
            </button>
          </div>
        </form>
      </FormProvider>
      <Modal isOpen={isOpenModal} onClose={handleCloseModal}>
        <ChangePasswordModal onSuccess={handleCloseModal} />
      </Modal>
    </Block>
  );
}
