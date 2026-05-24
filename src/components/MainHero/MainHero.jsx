import React, { useState } from "react";
import MainHeroContent from "../MainHeroContent/MainHeroContent";
import MainHeroTitle from "../MainHeroTitle/MainHeroTitle";
import MainHeroStats from "../MainHeroStats/MainHeroStats";
import styles from "./MainHero.module.css";
import Button from "../../common/Button/Button";
import { useT } from "../../utils/useT";
import { useNavigate } from "react-router-dom";
import routes from "../../stores/routes.json";
import { useAuthStore } from "../../stores/authStore";
import { FormProvider, useForm } from "react-hook-form";
import { apiClient as client } from "../../api/client";
import AutocompleteField from "../../common/AutocompleteField/AutocompleteField";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export default function MainHero() {
  const t = useT();
  const navigate = useNavigate();
  const { user } = useAuthStore();
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
    <div className={styles.wrapper}>
      <MainHeroContent>
        <div className={styles.info}>
          <MainHeroTitle />
          <MainHeroStats />
        </div>

        <div className={styles.content}>
          <FormProvider {...methods}>
            <form
              className={styles.searchForm}
              onSubmit={methods.handleSubmit(handleSubmit)}
            >
              <AutocompleteField
                label="Поиск информации о доме по адресу"
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
        <Button
          onClick={() => navigate(routes.createRequest)}
          disabled={user?.status !== "Approved"}
        >
          {t("main.createRequest")}
        </Button>
      </MainHeroContent>
    </div>
  );
}
