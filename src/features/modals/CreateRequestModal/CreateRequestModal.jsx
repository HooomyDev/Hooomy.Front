import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import FileUploadField from "../../../common/FileUploadField/FileUploadField";
import RequestByAdress from "../../../components/RequestByAdress/RequestByAdress";
import RequestByMap from "../../../components/RequestByMap/RequestByMap";
import styles from "./CreateRequestModal.module.css";
import TabPanel from "../../../common/TabPanel/TabPanel";
import InputField from "../../../common/InputField/InputField";
import { useT } from "../../../utils/useT";
import {
  createRequest,
  getRequestCategories,
  uploadRequestPhotos,
} from "../../../api/services/requestService";
import { useMutation, useQuery } from "@tanstack/react-query";
import Loader from "../../../common/Loader/Loader";
import SelectField from "../../../common/SelectField/SelectField";

export default function CreateRequestModal({ onSuccess }) {
  const t = useT();

  const { data: requestCategories, isLoading } = useQuery({
    queryKey: ["requestCategories"],
    queryFn: () => getRequestCategories(),
  });

  const submitMutation = useMutation({
    mutationFn: async (data) => {
      // Формируем адрес
      const address = data.street ? data.street : data.location.address || "";

      // 1. Создаем запрос
      const requestId = await createRequest(
        data.title,
        data.description,
        address,
        data.category
      );

      // 2. Если есть фото, загружаем их
      if (data.photos && data.photos.length > 0) {
        // Создаем FormData для загрузки файлов
        const formData = new FormData();

        // Добавляем каждый файл в поле "files" (как ожидает бэкенд)
        data.photos.forEach((photo) => {
          formData.append("files", photo);
        });

        // Вызываем API для загрузки фото
        await uploadRequestPhotos(requestId, formData);
      }

      return requestId;
    },
    onSuccess: (requestId) => {
      methods.reset(); // очищаем форму после успешной отправки
      if (onSuccess) {
        onSuccess(requestId); // вызываем колбэк успеха с id созданного запроса
      }
    },
    onError: (error) => {
      console.error("Ошибка при создании запроса:", error);
      // здесь можно добавить обработку ошибок (показать уведомление и т.д.)
    },
  });

  const methods = useForm({
    defaultValues: {
      district: "",
      street: "",
      title: "",
      description: "",
      photo: [],
      location: null,
      category: 0,
    },
  });

  const onSubmit = async (data) => {
    submitMutation.mutate(data);
  };

  if (isLoading) {
    return <Loader />;
  }

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

        <SelectField
          label="Категория проблемы"
          {...methods.register("category")}
          options={requestCategories.map((category) => {
            return { value: category.code, label: category.name };
          })}
          required
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
