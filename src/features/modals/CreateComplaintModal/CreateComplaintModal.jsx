import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import Modal from "../Modal/Modal";
import InputField from "../../../common/InputField/InputField";
import Button from "../../../common/Button/Button";
import { createComplaint } from "../../../api/services/complaintService";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import styles from "./CreateComplaintModal.module.css";
import { useT } from "../../../utils/useT";

export const COMPLAINT_TYPES = [
  { value: 1, label: "Жалоба на жильца" },
  { value: 2, label: "Жалоба на управляющую компанию" },
  { value: 3, label: "Жалоба на комментарий" },
  { value: 4, label: "Жалоба на исполнение заявки" },
  { value: 5, label: "Жалоба на работу сервиса" },
];

export default function CreateComplaintModal({ isOpen, onClose, type, data }) {
  const t = useT();
  const typeLabel = t(`adminComplaints.types.${type}`);

  const methods = useForm({
    defaultValues: { shortDescription: "", description: "" },
  });

  const mutation = useMutation({
    mutationFn: ({ shortDescription, description }) => {
      let finalDescription = description;

      if (type === 1) {
        const residentId =
          data?.residentId || t("createComplaintModal.notSpecified");
        finalDescription = `${t("createComplaintModal.ids.resident")}: ${residentId}.\n ${description}`;
      }

      if (type === 2) {
        const companyId = data?.id || t("createComplaintModal.notSpecified");
        finalDescription = `${t("createComplaintModal.ids.company")}: ${companyId}.\n ${description}`;
      }

      if (type === 3) {
        const commentId = data?.id || t("createComplaintModal.notSpecified");
        finalDescription = `${t("createComplaintModal.ids.comment")}: ${commentId}.\n ${description}`;
      }

      if (type === 4) {
        const commentId = data?.id || t("createComplaintModal.notSpecified");
        finalDescription = `${t("createComplaintModal.ids.request")}: ${commentId}.\n ${description}`;
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
        <h2 className={styles.title}>{t("createComplaintModal.title")}</h2>
        {typeLabel && <span className={styles.typeBadge}>{typeLabel}</span>}
      </div>

      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(handleSubmit)}
          className={styles.form}
        >
          <InputField
            name="shortDescription"
            label={t("createComplaintModal.shortDescriptionLabel")}
            placeholder={t("createComplaintModal.shortDescriptionPlaceholder")}
            rules={{ required: t("createComplaintModal.requiredField") }}
          />
          <InputField
            name="description"
            label={t("createComplaintModal.descriptionLabel")}
            placeholder={t("createComplaintModal.descriptionPlaceholder")}
            rules={{ required: t("createComplaintModal.requiredField") }}
            multiline
          />

          {mutation.isError && (
            <div className={styles.errorBanner}>
              <ExclamationTriangleIcon className={styles.errorIcon} />
              {t("createComplaintModal.errorBanner")}
            </div>
          )}

          <div className={styles.actions}>
            <Button
              type="button"
              className={styles.cancelBtn}
              onClick={onClose}
            >
              {t("createComplaintModal.cancel")}
            </Button>
            <Button
              type="submit"
              disabled={mutation.isPending}
              title={
                mutation.isPending
                  ? t("createComplaintModal.sending")
                  : t("createComplaintModal.sendButtonTitle")
              }
            >
              {mutation.isPending
                ? t("createComplaintModal.sending")
                : t("createComplaintModal.submit")}
            </Button>
          </div>
        </form>
      </FormProvider>
    </Modal>
  );
}
