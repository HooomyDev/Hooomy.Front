import React, { useEffect, useState } from "react";
import styles from "./MyRequests.module.css";
import { useT } from "../../utils/useT";
import Loader from "../../common/Loader/Loader";
import {
  ClipboardDocumentListIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import MyRequestsList from "./components/MyRequestsList/MyRequestsList";
import PageHeader from "../../common/PageHeader/PageHeader";
import {
  getMyRequests,
  getRequestCategories,
} from "../../api/services/requestService";
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
        filters.searchAddress
      ),
  });

  const { data: requestCategories, isLoading: isCategoriesLoading } = useQuery({
    queryKey: ["requestCategories"],
    queryFn: () => getRequestCategories(),
  });

  const statusOptions = [
    { value: 0, label: t("requests.all") },
    { value: 1, label: "На модерации" },
    { value: 2, label: "Создана" },
    { value: 3, label: "Отклонена" },
    { value: 4, label: "В работе" },
    { value: 5, label: "Завершена" },
  ];

  useEffect(() => {
    if (error) {
      const statusCode =
        error.response?.status || error.status || error.statusCode;

      if (statusCode === 403) {
        setNotification({
          type: "error",
          message:
            error.response?.data?.message ||
            error.response?.data?.error ||
            "Доступ запрещен. Ваш аккаунт требует подтверждения.",
        });
        setDisabled(true);
      }
    }
  }, [error]);

  if (isLoading && isCategoriesLoading) return <Loader />;

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
              label="Поиск"
              placeholder="Название заявки"
              required={false}
              rules={{}}
            />

            <AutocompleteField
              label="Адрес"
              name="searchAddress"
              options={streetOptions}
              onSearch={handleStreetSearch}
            />

            <SelectField
              name="searchCategory"
              label="Категория"
              options={
                requestCategories?.map((c) => ({
                  value: c.code,
                  label: c.name,
                })) || []
              }
              required={false}
            />

            <SelectField
              name="searchStatus"
              label="Статус"
              options={statusOptions}
            />

            <Button
              className={styles.searchButton}
              onClick={() => handleSearch()}
              variant="secondary"
              type="submit"
            >
              <MagnifyingGlassIcon className={styles.icon} />
            </Button>
            <Button
              className={styles.searchButton}
              onClick={() => navigate(routes.createRequest)}
              variant="secondary"
              type="button"
            >
              <PlusIcon className={styles.icon} />
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
