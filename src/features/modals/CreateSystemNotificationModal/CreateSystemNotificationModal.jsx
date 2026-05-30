import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import Modal from "../Modal/Modal";
import InputField from "../../../common/InputField/InputField";
import Button from "../../../common/Button/Button";
import { createSystemNotification } from "../../../api/services/systemNotificationService";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import styles from "./CreateSystemNotificationModal.module.css";

export default function CreateSystemNotificationModal({ isOpen, onClose }) {
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
        <h2 className={styles.title}>Создать системное уведомление</h2>
      </div>

      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(handleSubmit)}
          className={styles.form}
        >
          <InputField
            name="text"
            label="Текст уведомления"
            placeholder="Введите текст уведомления"
            rules={{ required: "Обязательное поле" }}
            multiline
            rows={6}
          />

          {mutation.isError && (
            <div className={styles.errorBanner}>
              Ошибка при создании уведомления. Попробуйте снова.
            </div>
          )}

          <div className={styles.actions}>
            <Button type="button" className={styles.cancelBtn} onClick={onClose}>
              Отмена
            </Button>
            <Button
              type="submit"
              disabled={mutation.isPending}
              title={mutation.isPending ? "Отправка..." : "Создать"}
            >
              Создать
            </Button>
          </div>
        </form>
      </FormProvider>
    </Modal>
  );
}
