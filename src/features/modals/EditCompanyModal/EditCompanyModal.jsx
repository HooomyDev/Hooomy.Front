import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import Modal from "../Modal/Modal";
import InputField from "../../../common/InputField/InputField";
import AutocompleteField from "../../../common/AutocompleteField/AutocompleteField";
import Button from "../../../common/Button/Button";
import { updateCompany } from "../../../api/services/companyService";
import { apiClient as client } from "../../../api/client";
import styles from "./EditCompanyModal.module.css";

export default function EditCompanyModal({ isOpen, onClose, company }) {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch] = useDebounce(searchTerm, 500);

  const methods = useForm({
    defaultValues: {
      name: company?.name ?? "",
      phone: company?.phone ?? "",
      email: company?.email ?? "",
      workingHours: company?.workingHours ?? "",
      addressId: company?.addressId ?? "",
    },
  });

  const { data: addressOptions = [], isFetching } = useQuery({
    queryKey: ["addressSearch", debouncedSearch],
    queryFn: async () => {
      const res = await client.get(`/addresses?searchQuery=${debouncedSearch}`);
      return res.data.addresses.map((a) => ({
        value: a.id,
        label: `${a.street}, ${a.houseNumber}`,
      }));
    },
    enabled: debouncedSearch.length >= 2,
    staleTime: 5 * 60 * 1000,
    placeholderData: [],
  });

  const mutation = useMutation({
    mutationFn: (data) =>
      updateCompany({
        id: company.id,
        ...data,
        addressId: data.addressId || company?.addressId,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["company", company.id] });
      onClose();
    },
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className={styles.title}>Редактировать компанию</h2>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) => mutation.mutate(data))}
          className={styles.form}
        >
          <InputField
            name="name"
            label="Название"
            placeholder="Название компании"
            rules={{ required: "Обязательное поле" }}
          />
          <InputField
            name="phone"
            label="Телефон"
            placeholder="+375 XX XXX-XX-XX"
          />
          <InputField
            name="email"
            label="Email"
            type="email"
            placeholder="company@example.com"
          />
          <InputField
            name="workingHours"
            label="Режим работы"
            placeholder="Пн–Пт 9:00–18:00"
          />
          <AutocompleteField
            name="addressId"
            label="Адрес"
            options={addressOptions}
            onSearch={setSearchTerm}
            loading={isFetching}
          />

          {mutation.isError && (
            <p className={styles.error}>Ошибка при сохранении</p>
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
              title={mutation.isPending ? "Сохранение..." : "Сохранить"}
            >
              Сохранить
            </Button>
          </div>
        </form>
      </FormProvider>
    </Modal>
  );
}
