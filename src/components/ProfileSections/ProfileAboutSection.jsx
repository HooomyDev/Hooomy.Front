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
import Modal from "../../features/modals/Modal/Modal";
import ChangePasswordModal from "../../features/modals/ChangePasswordModal/ChangePasswordModal";
import Block from "../../common/Block/Block";
import { IdentificationIcon } from "@heroicons/react/24/solid";
import { useT } from "../../utils/useT";
import { useAuthStore } from "../../stores/authStore";
import { authClient as client } from "../../api/client";
import Notification from "../../common/Notification/Notification";

export default function ProfileAboutSection({ user }) {
  const t = useT();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [notification, setNotification] = useState(null);

  const methods = useForm({
    defaultValues: {
      email: user?.email || "",
      name: user?.firstName || "",
      surname: user?.surname || "",
      patronymic: user?.patronymic || "",
      phone: user?.phoneNumber || "",
      password: user?.password,
    },
  });

  const values = methods.watch();
  const hasChanges =
    values.email !== user?.email ||
    values.name !== user?.firstName ||
    values.surname !== user?.surname ||
    values.patronymic !== user?.patronymic ||
    values.phone !== user?.phoneNumber;

  const { login } = useAuthStore();

  const onSubmit = async (data) => {
    try {
      const response = await client.put("/profile", {
        id: user.id,
        email: data.email,
        firstName: data.name,
        surname: data.surname,
        patronymic: data.patronymic,
        phoneNumber: data.phone || "",
      });
      const updatedUser = response.data.user;
      login(updatedUser);
      setNotification({ type: "success", message: "Профиль обновлён" });
    } catch (error) {
      console.error("Update failed:", error);
      setNotification({
        type: "error",
        message: error.response?.data?.message || "Ошибка обновления профиля",
      });
    }
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  return (
    <Block title={t("profile.about")} Icon={IdentificationIcon}>
      {notification && (
        <Notification duration={3000}>{notification.message}</Notification>
      )}

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
                value={user.surname}
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

            <button
              type="submit"
              className={hasChanges ? styles.button : styles.buttonDisabled}
              disabled={!hasChanges}
            >
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
