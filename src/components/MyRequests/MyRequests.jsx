import React, { useEffect, useState } from "react";
import styles from "./MyRequests.module.css";
import { useT } from "../../utils/useT";
import Loader from "../../common/Loader/Loader";
import {
  ClipboardDocumentListIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import MyRequestsList from "./components/MyRequestsList/MyRequestsList";
import PageHeader from "../../common/PageHeader/PageHeader";
import { getMyRequests } from "../../api/services/requestService";
import Notification from "../../common/Notification/Notification";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import routes from "../../stores/routes.json";
import Block from "../../common/Block/Block";
import InputField from "../../common/InputField/InputField";
import SelectField from "../../common/SelectField/SelectField";
import Button from "../../common/Button/Button";
import { FormProvider, useForm } from "react-hook-form";
import AutocompleteField from "../../common/AutocompleteField/AutocompleteField";
import { apiClient as client } from "../../api/client";
import { categoryMap } from "../../stores/categories";

export default function MyRequests() {
  const t = useT();
  const navigate = useNavigate();
  const methods = useForm();

  const [filters, setFilters] = useState({
    requestStatus: undefined,
    requestCategory: undefined,
    searchTitle: undefined,
    searchAddress: undefined,
  });
  const [notification, setNotification] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const [streetOptions, setStreetOptions] = useState([]);

  const handleStreetSearch = async (query) => {
    if (!query) {
      setStreetOptions([]);
      return;
    }

    try {
      const res = await client.get(
        `/addresses?searchQuery=${encodeURIComponent(query)}`,
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

  const handleSearch = () => {
    const formValues = methods.getValues();
    setFilters({
      searchTitle: formValues.searchTitle || "",
      searchStatus: formValues.searchStatus || "",
      searchCategory: formValues.searchCategory || "",
      searchAddress: formValues.searchAddress || "",
    });
  };

  const {
    data: requests,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["requests", filters],
    queryFn: async () =>
      await getMyRequests(
        filters.searchStatus,
        filters.searchTitle,
        filters.searchCategory,
        filters.searchAddress,
      ),
  });

  const statusOptions = [
    { value: 0, label: t("requests.all") },
    { value: 1, label: t("requests.moder") },
    { value: 2, label: t("employeeRequests.status.new") },
    { value: 3, label: t("requests.rejected") },
    { value: 4, label: t("requests.pending") },
    { value: 5, label: t("employeeRequests.status.completed") },
  ];

  useEffect(() => {
    if (error) {
      const statusCode =
        error.response?.status || error.status || error.statusCode;

      if (statusCode === 403) {
        setNotification({
          type: "error",
          message: t("requests.error"),
        });
        setDisabled(true);
      }
    }
  }, [error, t]);

  if (isLoading) return <Loader />;

  return (
    <div className={styles.wrapper}>
      {notification && (
        <Notification
          duration={3000}
          onClose={() => setNotification(null)}
          type={notification.type}
        >
          <div>{notification.message}</div>
        </Notification>
      )}
      <PageHeader
        title={t("requests.title")}
        icon={ClipboardDocumentListIcon}
      />
      <Block>
        <form
          className={styles.searchBlock}
          onSubmit={methods.handleSubmit(handleSearch)}
        >
          <FormProvider {...methods}>
            <InputField
              name="searchTitle"
              label={t("common.search")}
              placeholder={t("common.searchPlaceholder")}
              required={false}
              rules={{}}
            />

            <AutocompleteField
              label={t("common.address")}
              name="searchAddress"
              options={streetOptions}
              onSearch={handleStreetSearch}
            />

            <SelectField
              name="searchCategory"
              label={t("common.category")}
              options={Object.entries(categoryMap).map(([code, key]) => {
                const categoryCode = Number(code);
                return {
                  value: categoryCode,
                  label: t(`statistic.categories.${key}`),
                };
              })}
              required={false}
            />

            <SelectField
              name="searchStatus"
              label={t("requests.status")}
              options={statusOptions}
            />

            <Button
              className={styles.searchButton}
              onClick={() => {
                setFilters({
                  requestStatus: undefined,
                  requestCategory: undefined,
                  searchTitle: undefined,
                  searchAddress: undefined,
                });
                methods.reset();
              }}
              variant="secondary"
              type="submit"
            >
              <XMarkIcon className={styles.icon} />
            </Button>

            <Button
              className={styles.searchButton}
              onClick={() => handleSearch()}
              variant="secondary"
              type="submit"
            >
              <MagnifyingGlassIcon className={styles.icon} />{" "}
              <span className={styles.text}>{t("common.search")}</span>
            </Button>
            <Button
              className={styles.searchButton}
              onClick={() => navigate(routes.createRequest)}
              variant="secondary"
              type="button"
              disabled={disabled}
            >
              <PlusIcon className={styles.icon} />
              <span className={styles.text}>
                {t("requests.createNewRequest")}
              </span>
            </Button>
          </FormProvider>
        </form>
      </Block>

      <div className={styles.section}>
        <MyRequestsList requests={requests ?? []} />
      </div>
    </div>
  );
}
