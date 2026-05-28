import React, { useState } from "react";
import styles from "./SearchHouse.module.css";
import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { apiClient as client } from "../../api/client";
import AutocompleteField from "../../common/AutocompleteField/AutocompleteField";
import Button from "../../common/Button/Button";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import routes from "../../stores/routes.json";

export default function SearchHouse() {
  const navigate = useNavigate();
  const methods = useForm({
    defaultValues: {
      address: "",
    },
  });

  const [streetOptions, setStreetOptions] = useState([]);

  const handleStreetSearch = async (query) => {
    if (!query) {
      setStreetOptions([]);
      return;
    }

    try {
      const res = await client.get(
        `/addresses?searchQuery=${encodeURIComponent(query)}`
      );
      const options = res.data.addresses.map((s) => ({
        value: s.id,
        label: `${s.street}, ${s.houseNumber}`,
      }));
      setStreetOptions(options);
    } catch (error) {
      console.error("Street search failed:", error);
      setStreetOptions([]);
    }
  };

  const { setError, clearErrors } = methods;

  const handleSubmit = async (data) => {
    if (!data.address) {
      setError("address", {
        type: "manual",
        message: "Пожалуйста, выберите адрес из списка",
      });
      return;
    }

    clearErrors("address");
    navigate(`${routes.house}/${data.address}`);
  };

  return (
    <div className={styles.content}>
      <div className={styles.title}>Поиск информации о доме</div>
      <FormProvider {...methods}>
        <form
          className={styles.searchForm}
          onSubmit={methods.handleSubmit(handleSubmit)}
        >
          <AutocompleteField
            name="address"
            options={streetOptions}
            onSearch={handleStreetSearch}
          />
          <Button
            className={styles.searchButton}
            variant="secondary"
            type="submit"
          >
            <MagnifyingGlassIcon className={styles.icon} />
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}
