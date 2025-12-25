import React, { useState } from "react";
import styles from "./Profile.module.css";
import { useAuthStore } from "../../stores/authStore";
import {
  IdentificationIcon,
  HomeIcon,
  PencilSquareIcon,
  MapPinIcon,
  PlusCircleIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/solid";
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

export default function Profile() {
  const user = useAuthStore((store) => store.user);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isItemChanging, setIsItemChanging] = useState(false);

  const [favAddresses, setFavAddresses] = useState([
    {
      id: 1,
      pseudonym: "main",
      address: "ул. Ленина, д. 10, кв. 5",
    },
    {
      id: 2,
      pseudonym: "work",
      address: "пр. Независимости, д. 25, офис 301",
    },
  ]);

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

  const handleItemChangeClick = () => {
    setIsItemChanging(!isItemChanging);
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
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          <HomeIcon className={styles.icon} />
          Мои адреса
        </h3>

        <div className={styles.list}>
          <>
            {favAddresses.map((item) => (
              <div key={item.id} className={styles.item}>
                <input
                  className={`${styles.itemPseudonym} ${
                    isItemChanging ? styles.changing : ""
                  }`}
                  value={item.pseudonym}
                  disabled={!isItemChanging}
                  onChange={(e) =>
                    setFavAddresses(
                      favAddresses.map((addr) =>
                        addr.id === item.id
                          ? { ...addr, pseudonym: e.target.value }
                          : addr
                      )
                    )
                  }
                />
                <input
                  className={`${styles.itemAddress} ${
                    isItemChanging ? styles.changing : ""
                  }`}
                  value={item.address}
                  disabled={!isItemChanging}
                  onChange={(e) =>
                    setFavAddresses(
                      favAddresses.map((addr) =>
                        addr.id === item.id
                          ? { ...addr, address: e.target.value }
                          : addr
                      )
                    )
                  }
                />
                <div className={styles.itemButtons}>
                  <div className={styles.wrap}>
                    <button
                      className={styles.itemButton}
                      onClick={() => handleItemChangeClick()}
                      title="Изменить адрес"
                    >
                      <PencilSquareIcon className={styles.icon} />
                    </button>

                    {isItemChanging && (
                      <button
                        className={styles.itemButton}
                        onClick={() => handleItemChangeClick()}
                        title="Сохранить"
                      >
                        <ClipboardDocumentCheckIcon className={styles.icon} />
                      </button>
                    )}
                  </div>

                  <button
                    className={styles.itemButton}
                    title="Показать адресс на карте"
                  >
                    <MapPinIcon className={styles.icon} /> На карте
                  </button>
                </div>
              </div>
            ))}
            <div className={styles.item}>
              <input
                className={`${styles.itemPseudonym} ${
                  isItemChanging ? styles.changing : ""
                }`}
                disabled={!isItemChanging}
                value="Новый адрес"
              />
              <input
                className={`${styles.itemAddress} ${
                  isItemChanging ? styles.changing : ""
                }`}
                disabled={!isItemChanging}
                value="Добавить новый адресс"
              />
              <button className={styles.addButton}>
                <PlusCircleIcon className={styles.icon} /> Добавить адрес
              </button>
            </div>
          </>
        </div>
      </div>
      <Modal isOpen={isOpenModal} onClose={handleCloseModal}>
        <ChangePasswordModal onSuccess={handleCloseModal} />
      </Modal>
    </div>
  );
}
