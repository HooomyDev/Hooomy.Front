import React from "react";
import { FormProvider } from "react-hook-form";
import InputField from "../../../common/InputField/InputField";
import styles from "./ChangeObjectModal.module.css";

export default function ChangeObjectModal({ methods, onSave, onClose }) {
  return (
    <div className={styles.modal}>
      <h2>Редактирование жилого объекта</h2>

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
            Сохранить
          </button>
        </form>
      </FormProvider>
    </div>
  );
}
