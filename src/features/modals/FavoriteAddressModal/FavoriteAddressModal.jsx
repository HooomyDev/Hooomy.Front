import React, { useState } from "react";
import styles from "./FavoriteAddressModal.module.css";
import { useT } from "../../../utils/useT";
import { FormProvider } from "react-hook-form";
import InputField from "../../../common/InputField/InputField";
import AutocompleteField from "../../../common/AutocompleteField/AutocompleteField";
import Button from "../../../common/Button/Button";
import { apiClient as client } from "../../../api/client";

export default function FavoriteAddressModal({
  editingAddress,
  handleSaveAddress,
  methods,
}) {
  const t = useT();

  const [streetOptions, setStreetOptions] = useState([]);

  const handleStreetSearch = async (query) => {
    if (!query) {
      setStreetOptions([]);
      return;
    }

    try {
      const res = await client.get(
        `/search?query=${encodeURIComponent(query)}`
      );
      const options = res.data.streets.map((s) => ({
        value: s.title,
        label: s.title,
      }));
      setStreetOptions(options);
    } catch (error) {
      console.error("Street search failed:", error);
      setStreetOptions([]);
    }
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
            label={t("user.street")}
            name="street"
            options={streetOptions}
            required
            onSearch={handleStreetSearch}
          />

          <InputField
            label={t("profile.enterHouse")}
            name="house"
            type="number"
            required
            placeholder={t("profile.enterHouse")}
          />

          <Button type="submit">{t("user.save")}</Button>
        </form>
      </FormProvider>
    </div>
  );
}
