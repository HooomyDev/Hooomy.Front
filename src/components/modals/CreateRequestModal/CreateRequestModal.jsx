import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import InputField from "../../InputField/InputField";
import SelectField from "../../SelectField/SelectField";
import { districts } from "../../../stores/districts";
import { streets } from "../../../stores/streets";
import styles from "./CreateRequestModal.module.css";

export default function CreateRequestModal() {
  const methods = useForm({
    defaultValues: {
      district: "",
      street: "",
      house: "",
      entrance: "",
      floor: "",
      apartment: "",
      description: "",
      photo: null,
    },
  });

  const onSubmit = (data) => {
    console.log("Form data:", data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.title}>Новая заявка</div>

        <div className={styles.tabs}>
          <button type="button" className={styles.button}>
            Заявка по адресу
          </button>
          <button type="button" className={styles.button}>
            Заявка по точке на карте
          </button>
        </div>

        <SelectField label="Район" name="district" options={districts} />
        <SelectField
          label="Улица"
          name="street"
          options={streets[methods.watch("district")] || []}
        />

        <div className={styles.inputContainer}>
          <InputField label="Дом" name="house" />
          <InputField label="Подъезд" name="entrance" type="number" />
          <InputField label="Этаж" name="floor" type="number" />
          <InputField label="Квартира" name="apartment" />
        </div>

        <InputField label="Описание проблемы" name="description" multiline />

        <div className={styles.fileUpload}>
          <label className={styles.label} htmlFor="photo">
            Фото проблемы
          </label>
          <input
            id="photo"
            type="file"
            accept="image/*"
            {...methods.register("photo")}
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          Создать
        </button>
      </form>
    </FormProvider>
  );
}
