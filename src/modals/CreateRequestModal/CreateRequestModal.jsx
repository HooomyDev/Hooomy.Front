import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import FileUploadField from "../../common/FileUploadField/FileUploadField";
import RequestByAdress from "../../components/RequestByAdress/RequestByAdress";
import RequestByMap from "../../components/RequestByMap/RequestByMap";
import styles from "./CreateRequestModal.module.css";
import TabPanel from "../../common/TabPanel/TabPanel";
import InputField from "../../common/InputField/InputField";

export default function CreateRequestModal({ onSuccess }) {
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
      location: null,
    },
  });

  const onSubmit = (data) => {
    console.log("Form data:", data);
    onSuccess();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.title}>Новая заявка</div>

        <TabPanel
          tabs={[
            {
              id: "address",
              title: "Заявка по адресу",
              content: <RequestByAdress />,
            },
            {
              id: "map",
              title: "Заявка по точке на карте",
              content: <RequestByMap />,
            },
          ]}
        />

        <InputField
          label="Описание проблемы"
          name="description"
          multiline
          required
        />

        <FileUploadField required />

        <button
          type="submit"
          className={styles.submitButton}
          onSubmit={onSubmit}
        >
          Создать
        </button>
      </form>
    </FormProvider>
  );
}
