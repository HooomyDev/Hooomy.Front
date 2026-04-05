import React, { useState } from "react";
import styles from "./FavoriteAddressModal.module.css";
import { useT } from "../../../utils/useT";
import { FormProvider } from "react-hook-form";
import InputField from "../../../common/InputField/InputField";
import AutocompleteField from "../../../common/AutocompleteField/AutocompleteField";
import Button from "../../../common/Button/Button";
import { apiClient as client } from "../../../api/client";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";

export default function FavoriteAddressModal({
  editingAddress,
  handleSaveAddress,
  methods,
}) {
  const t = useT();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  // useQuery для поиска улиц
  const { data: streetOptions = [], isFetching } = useQuery({
    queryKey: ["streetSearch", debouncedSearchTerm],
    queryFn: async () => {
      if (!debouncedSearchTerm || debouncedSearchTerm.length < 2) {
        return [];
      }

      const res = await client.get(
        `/addresses?searchQuery=${debouncedSearchTerm}`
      );
      return res.data.addresses.map((s) => ({
        value: s.id,
        label: `${s.street}, ${s.houseNumber}`,
      }));
    },
    enabled: debouncedSearchTerm?.length >= 2,
    staleTime: 5 * 60 * 1000,
    placeholderData: [],
  });

  const handleStreetSearch = (query) => {
    setSearchTerm(query);
  };

  return (
    <div className={styles.modalContent}>
      <h2>
        {editingAddress ? t("profile.changeAddress") : t("profile.addAddress")}
      </h2>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleSaveAddress)}>
          <InputField
            label={t("profile.enterPseudonym")}
            name="pseudonym"
            type="text"
            required
            placeholder={t("profile.enterPseudonym")}
          />

          <AutocompleteField
            label="Адрес"
            name="street"
            options={streetOptions}
            required
            onSearch={handleStreetSearch}
            loading={isFetching}
          />

          <Button className={styles.button} type="submit">
            {t("user.save")}
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}
