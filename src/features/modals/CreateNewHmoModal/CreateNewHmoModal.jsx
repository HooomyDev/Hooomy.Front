import React from "react";
import { FormProvider } from "react-hook-form";
import InputField from "../../../common/InputField/InputField";
import styles from "./CreateNewHmoModal.module.css";

export default function CreateNewHmoModal({ methods, onSave, onClose }) {
  return (
    <div className={styles.modal}>
      <h2>Добавление управляющей компании</h2>

      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSave)}
          className={styles.modalForm}
        >
          <InputField
            name="name"
            label="Название"
            required
            placeholder="Введите название ЖЭУ"
          />
          <InputField
            name="district"
            label="Район"
            required
            placeholder="Введите район"
          />
          <button type="submit" className={styles.saveButton}>
            Добавить
          </button>
        </form>
      </FormProvider>
    </div>
  );
}
