import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import Modal from "../Modal/Modal";
import InputField from "../../../common/InputField/InputField";
import Button from "../../../common/Button/Button";
import { createComplaint } from "../../../api/services/complaintService";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import styles from "./CreateComplaintModal.module.css";

export const COMPLAINT_TYPES = [
  { value: 1, label: "Жалоба на жильца" },
  { value: 2, label: "Жалоба на управляющую компанию" },
  { value: 3, label: "Жалоба на комментарий" },
  { value: 4, label: "Жалоба на исполнение заявки" },
  { value: 5, label: "Жалоба на работу сервиса" },
];

export default function CreateComplaintModal({ isOpen, onClose, type, data }) {
  const typeLabel = COMPLAINT_TYPES.find((t) => t.value === type)?.label ?? "";

  const methods = useForm({
    defaultValues: { shortDescription: "", description: "" },
  });

  const mutation = useMutation({
    mutationFn: ({ shortDescription, description }) => {
      let finalDescription = description;

      if (type === 1) {
        const residentId = data?.residentId || "не указан";
        finalDescription = `ID Жильца: ${residentId}\n. ${description}`;
      }

      if (type === 2) {
        const companyId = data?.id || "не указан";
        finalDescription = `ID Компании: ${companyId}\n. ${description}`;
      }

      if (type === 3) {
        const commentId = data?.id || "не указан";
        finalDescription = `ID Комментария: ${commentId}\n. ${description}`;
      }

      return createComplaint(shortDescription, finalDescription, type);
    },
    onSuccess: () => {
      methods.reset();
      onClose();
    },
  });

  const handleSubmit = (data) => mutation.mutate(data);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.header}>
        <div className={styles.iconWrap}>
          <ExclamationTriangleIcon className={styles.headerIcon} />
        </div>
        <h2 className={styles.title}>Создать жалобу</h2>
        {typeLabel && <span className={styles.typeBadge}>{typeLabel}</span>}
      </div>

      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(handleSubmit)}
          className={styles.form}
        >
          <InputField
            name="shortDescription"
            label="Краткое описание"
            placeholder="Кратко опишите суть проблемы"
            rules={{ required: "Обязательное поле" }}
          />
          <InputField
            name="description"
            label="Описание"
            placeholder="Подробное опишите вашу проблему"
            rules={{ required: "Обязательное поле" }}
            multiline
          />

          {mutation.isError && (
            <div className={styles.errorBanner}>
              <ExclamationTriangleIcon className={styles.errorIcon} />
              Ошибка при отправке жалобы. Попробуйте снова.
            </div>
          )}

          <div className={styles.actions}>
            <Button
              type="button"
              className={styles.cancelBtn}
              onClick={onClose}
            >
              Отмена
            </Button>
            <Button
              type="submit"
              disabled={mutation.isPending}
              title={mutation.isPending ? "Отправка..." : "Отправить жалобу"}
            >
              Отправить
            </Button>
          </div>
        </form>
      </FormProvider>
    </Modal>
  );
}
