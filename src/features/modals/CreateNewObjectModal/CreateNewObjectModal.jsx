import React from "react";
import { FormProvider } from "react-hook-form";
import InputField from "../../../common/InputField/InputField";
import styles from "./CreateNewObjectModal.module.css";

export default function CreateNewObjectModal({ methods, onSave, onClose }) {
  return (
    <div className={styles.modal}>
      <h2>Добавление жилого объекта</h2>

      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSave)}
          className={styles.modalForm}
        >
          <InputField
            name="address"
            label="Адрес"
            required
            placeholder="Введите адрес"
          />
          <InputField
            name="apartments"
            label="Количество квартир"
            type="number"
            required
            placeholder="Введите число"
          />

          <button type="submit" className={styles.saveButton}>
            Добавить
          </button>
        </form>
      </FormProvider>
    </div>
  );
}
