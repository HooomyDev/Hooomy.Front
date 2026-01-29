import React from "react";
import styles from "./FavoriteAddressModal.module.css";
import { useT } from "../../../utils/useT";
import { FormProvider } from "react-hook-form";
import InputField from "../../../common/InputField/InputField";
import AutocompleteField from "../../../common/AutocompleteField/AutocompleteField";
import Button from "../../../common/Button/Button";
import { streets } from "../../../stores/streets";

export default function FavoriteAddressModal({
  editingAddress,
  handleSaveAddress,
  methods,
}) {
  const t = useT();

  const allStreets = Object.entries(streets).flatMap(([district, arr]) =>
    arr.map((s) => ({
      value: s.value,
      label: s.label,
    }))
  );

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
            label="Улица"
            name="street"
            options={allStreets}
            required
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
