import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import Modal from "../Modal/Modal";
import AutocompleteField from "../../../common/AutocompleteField/AutocompleteField";
import Button from "../../../common/Button/Button";
import { apiClient as client } from "../../../api/client";
import { addAddressToCompany } from "../../../api/services/companyService";
import styles from "./AddAddressToCompanyModal.module.css";

export default function AddAddressToCompanyModal({
  isOpen,
  onClose,
  companyId,
}) {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch] = useDebounce(searchTerm, 500);

  const methods = useForm({ defaultValues: { address: "" } });

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
    mutationFn: ({ address }) => addAddressToCompany(companyId, address),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["company", companyId] });
      methods.reset();
      onClose();
    },
  });

  const handleSubmit = (data) => mutation.mutate(data);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className={styles.title}>Добавить адрес</h2>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(handleSubmit)}
          className={styles.form}
        >
          <AutocompleteField
            name="address"
            label="Адрес"
            options={addressOptions}
            required
            rules={{ required: "Выберите адрес" }}
            onSearch={setSearchTerm}
            loading={isFetching}
          />
          {mutation.isError && (
            <p className={styles.error}>Ошибка при добавлении адреса</p>
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
