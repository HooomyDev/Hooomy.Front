import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import FileUploadField from "../../../common/FileUploadField/FileUploadField";
import RequestByAdress from "../../../components/RequestByAdress/RequestByAdress";
import RequestByMap from "../../../components/RequestByMap/RequestByMap";
import styles from "./CreateRequestModal.module.css";
import TabPanel from "../../../common/TabPanel/TabPanel";
import InputField from "../../../common/InputField/InputField";
import { useT } from "../../../utils/useT";

export default function CreateRequestModal({ onSuccess }) {
  const t = useT();

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
        <div className={styles.title}>{t("modal.newRequest")}</div>

        <TabPanel
          tabs={[
            {
              id: "address",
              title: t("modal.requestByAddress"),
              content: <RequestByAdress />,
            },
            {
              id: "map",
              title: t("modal.requestByMap"),
              content: <RequestByMap />,
            },
          ]}
        />

        <InputField
          label={t("user.requestDescription")}
          name="description"
          multiline
          required
        />

        <FileUploadField required label={t("user.photo")} />

        <button
          type="submit"
          className={styles.submitButton}
          onSubmit={onSubmit}
        >
          {t("user.send")}
        </button>
      </form>
    </FormProvider>
  );
}
