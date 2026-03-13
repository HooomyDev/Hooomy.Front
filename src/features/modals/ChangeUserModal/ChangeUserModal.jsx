import React from "react";
import { FormProvider } from "react-hook-form";
import InputField from "../../../common/InputField/InputField";
import SelectField from "../../../common/SelectField/SelectField";
import styles from "./ChangeUserModal.module.css";
import Button from "../../../common/Button/Button";

export default function ChangeUserModal({ methods, onSave, roleOptions }) {
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSave)}
        className={styles.modalForm}
      >
        <h2>Редактирование пользователя</h2>
        <InputField
          name="name"
          label="Имя"
          required
          placeholder="Введите имя"
        />
        <SelectField name="role" label="Роль" options={roleOptions} required />

        <Button type="submit" className={styles.saveButton}>
          Сохранить
        </Button>
      </form>
    </FormProvider>
  );
}
