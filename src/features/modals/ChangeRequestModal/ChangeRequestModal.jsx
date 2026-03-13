import React from "react";
import { FormProvider } from "react-hook-form";
import InputField from "../../../common/InputField/InputField";
import SelectField from "../../../common/SelectField/SelectField";
import styles from "./ChangeRequestModal.module.css";

export default function ChangeRequestModal({ methods, onSave, onClose }) {
  const statusOptions = [
    { value: "open", label: "Открыта" },
    { value: "in_progress", label: "В работе" },
    { value: "done", label: "Завершена" },
  ];

  return (
    <div className={styles.modal}>
      <h2>Редактирование заявки</h2>

      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSave)}
          className={styles.modalForm}
        >
          <InputField
            name="title"
            label="Название"
            required
            placeholder="Введите название заявки"
          />
          <SelectField
            name="status"
            label="Статус"
            options={statusOptions}
            required
          />

          <button type="submit" className={styles.saveButton}>
            Сохранить
          </button>
        </form>
      </FormProvider>
    </div>
  );
}
