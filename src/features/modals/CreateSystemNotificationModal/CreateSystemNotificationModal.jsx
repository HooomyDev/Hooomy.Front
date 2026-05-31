import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import Modal from "../Modal/Modal";
import InputField from "../../../common/InputField/InputField";
import Button from "../../../common/Button/Button";
import { createSystemNotification } from "../../../api/services/systemNotificationService";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import styles from "./CreateSystemNotificationModal.module.css";
import { useT } from "../../../utils/useT";

export default function CreateSystemNotificationModal({ isOpen, onClose }) {
  const t = useT();
  const methods = useForm({ defaultValues: { text: "" } });

  const mutation = useMutation({
    mutationFn: ({ text }) => createSystemNotification(text),
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
          <InformationCircleIcon className={styles.headerIcon} />
        </div>
        <h2 className={styles.title}>
          {t("adminDashboard.createSystemNotification.title")}
        </h2>
      </div>

      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(handleSubmit)}
          className={styles.form}
        >
          <InputField
            name="text"
            label={t("adminDashboard.createSystemNotification.textLabel")}
            placeholder={t(
              "adminDashboard.createSystemNotification.textPlaceholder",
            )}
            rules={{ required: t("errors.required") || "Обязательное поле" }}
            multiline
            rows={6}
          />

          {mutation.isError && (
            <div className={styles.errorBanner}>
              {t("adminDashboard.createSystemNotification.createError")}
            </div>
          )}

          <div className={styles.actions}>
            <Button
              type="button"
              className={styles.cancelBtn}
              onClick={onClose}
            >
              {t("common.cancel")}
            </Button>
            <Button
              type="submit"
              disabled={mutation.isPending}
              title={
                mutation.isPending ? t("common.saving") : t("common.create")
              }
            >
              {t("common.create")}
            </Button>
          </div>
        </form>
      </FormProvider>
    </Modal>
  );
}
