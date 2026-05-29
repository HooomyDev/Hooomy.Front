import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Modal from "../Modal/Modal";
import InputField from "../../../common/InputField/InputField";
import Button from "../../../common/Button/Button";
import { addUserToCompany } from "../../../api/services/userService";
import styles from "./AddUserToCompanyModal.module.css";

export default function AddUserToCompanyModal({ isOpen, onClose, companyId }) {
  const queryClient = useQueryClient();

  const methods = useForm({
    defaultValues: {
      email: "",
      firstName: "",
      surname: "",
      patronymic: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data) => addUserToCompany({ ...data, companyId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["companyEmployees", companyId],
      });
      methods.reset();
      onClose();
    },
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className={styles.title}>Добавить работника</h2>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) => mutation.mutate(data))}
          className={styles.form}
        >
          <InputField
            name="surname"
            label="Фамилия"
            placeholder="Иванов"
            rules={{ required: "Обязательное поле" }}
          />
          <InputField
            name="firstName"
            label="Имя"
            placeholder="Иван"
            rules={{ required: "Обязательное поле" }}
          />
          <InputField
            name="patronymic"
            label="Отчество"
            placeholder="Иванович"
          />
          <InputField
            name="email"
            label="Email"
            type="email"
            placeholder="user@example.com"
            rules={{ required: "Обязательное поле" }}
          />

          {mutation.isError && (
            <p className={styles.error}>Ошибка при добавлении работника</p>
          )}

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={onClose}
            >
              Отмена
            </button>
            <Button
              type="submit"
              disabled={mutation.isPending}
              title={mutation.isPending ? "Сохранение..." : "Добавить"}
            >
              {mutation.isPending ? "Сохранение..." : "Добавить"}
            </Button>
          </div>
        </form>
      </FormProvider>
    </Modal>
  );
}
