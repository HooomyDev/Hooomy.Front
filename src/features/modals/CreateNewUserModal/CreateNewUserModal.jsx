import React from "react";
import { FormProvider } from "react-hook-form";
import InputField from "../../../common/InputField/InputField";
import SelectField from "../../../common/SelectField/SelectField";
import styles from "./CreateNewUserModal.module.css";

export default function CreateNewUserModal({ methods, onSave, roleOptions }) {
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSave)}
        className={styles.modalForm}
      >
        <h2>Новый пользователь</h2>

        <InputField
          name="name"
          label="Имя"
          required
          placeholder="Введите имя"
        />
        <SelectField name="role" label="Роль" options={roleOptions} required />
        <button type="submit" className={styles.saveButton}>
          Добавить
        </button>
      </form>
    </FormProvider>
  );
}
