import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import FileUploadField from "../../../common/FileUploadField/FileUploadField";
import RequestByAdress from "../../../components/RequestByAdress/RequestByAdress";
import RequestByMap from "../../../components/RequestByMap/RequestByMap";
import styles from "./CreateRequestModal.module.css";
import TabPanel from "../../../common/TabPanel/TabPanel";
import InputField from "../../../common/InputField/InputField";
import { useT } from "../../../utils/useT";
import { createRequest } from "../../../api/services/requestService";

export default function CreateRequestModal({ onSuccess }) {
  const t = useT();

  const methods = useForm({
    defaultValues: {
      district: "",
      street: "",
      house: "",
      title: "",
      description: "",
      photo: null,
      location: null,
    },
  });

  const onSubmit = async (data) => {
    await createRequest({
      title: data.title,
      description: data.description,
      address: data.street + ", " + data.house,
    });

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
          required
          label="Краткое описание проблемы"
          name="title"
          rules={{
            max: {
              value: 100,
            },
            min: {
              value: 1,
            },
          }}
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
