import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import FileUploadField from "../../FileUploadField/FileUploadField";
import TabPanel from "../../TabPanel/TabPanel";
import RequestByAdress from "../../RequestByAdress/RequestByAdress";
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
              content: <div></div>,
            },
          ]}
        />

        <FileUploadField />

        <button type="submit" className={styles.submitButton}>
          Создать
        </button>
      </form>
    </FormProvider>
  );
}
