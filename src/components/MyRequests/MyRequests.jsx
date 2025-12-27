import React, { useEffect, useState } from "react";
import styles from "./MyRequests.module.css";
import { useT } from "../../utils/useT";
import Loader from "../../common/Loader/Loader";
import Block from "../../common/Block/Block";
import SelectField from "../../common/SelectField/SelectField";
import {
  ClipboardDocumentListIcon,
  ListBulletIcon,
  PencilIcon,
  PlusIcon,
  AdjustmentsHorizontalIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { useForm, FormProvider } from "react-hook-form";
import DateField from "../../common/DateField/DateField";

export default function MyRequests() {
  const t = useT();
  const [allRequests, setAllRequests] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const statusClassMap = {
    Выполнено: styles.done,
    "В обработке": styles.pending,
    Отклонено: styles.rejected,
  };

  useEffect(() => {
    async function fetchRequests() {
      try {
        setLoading(true);

        // имитация загрузки
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // TODO: подключить реальные данные
        const data = [];

        setAllRequests(data);
        setRequests(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchRequests();
  }, [t]);

  const methods = useForm({
    defaultValues: { status: "all", startDate: "", endDate: "" },
  });

  const onSubmit = (data) => {
    console.log("Фильтры:", data);
    let filtered = allRequests;

    if (data.status !== "all") {
      filtered = filtered.filter((req) => {
        if (data.status === "pending") return req.status === "В обработке";
        if (data.status === "done") return req.status === "Выполнено";
        if (data.status === "rejected") return req.status === "Отклонено";
        return true;
      });
    }

    if (data.startDate) {
      filtered = filtered.filter(
        (req) => new Date(req.date) >= new Date(data.startDate)
      );
    }
    if (data.endDate) {
      filtered = filtered.filter(
        (req) => new Date(req.date) <= new Date(data.endDate)
      );
    }

    setRequests(filtered);
  };

  const onFilterSelect = (value) => {
    if (value === "all") {
      setSelectedFilters([{ value: "all", label: t("requests.all") }]);
      return;
    }

    let updatedFilters = [...selectedFilters];

    if (value !== "all" && updatedFilters.some((f) => f.value === "all")) {
      updatedFilters = updatedFilters.filter((f) => f.value !== "all");
    }

    if (!updatedFilters.some((f) => f.value === value)) {
      updatedFilters.push({ value, label: t(`requests.${value}`) });
    }

    setSelectedFilters(updatedFilters);
  };

  const handleRemoveFilter = (value) => {
    setSelectedFilters((prevFilters) =>
      prevFilters.filter((filter) => filter.value !== value.value)
    );
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.wrapper}>
      <Block>
        <div className={styles.container}>
          <ClipboardDocumentListIcon className={styles.icon} />
          <div className={styles.title}>{t("requests.title")}</div>
        </div>
      </Block>

      <div className={styles.section}>
        <div className={styles.sectionItem1}>
          <Block title={t("requests.list")} Icon={ListBulletIcon}>
            <div className={styles.container2}>
              {requests.length === 0 ? (
                <div className={styles.message}>{t("requests.empty")}</div>
              ) : (
                <ul className={styles.list}>
                  {requests.map((req) => (
                    <li key={req.id} className={styles.item}>
                      <span className={styles.reqTitle}>{req.title}</span>
                      <span className={styles.reqStatus}>{req.date}</span>
                      <div className={styles.status}>
                        <span className={styles.reqStatus}>{req.status}</span>
                        <span
                          className={`${styles.reqStatusSquare} ${
                            statusClassMap[req.status] || styles.default
                          }`}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Block>
        </div>

        <div className={styles.sectionItem2}>
          <Block title={t("requests.newRequest")} Icon={PencilIcon}>
            <button type="button" className={styles.createRequestButton}>
              <PlusIcon className={styles.btnIcon} />
              {t("requests.createNewRequest")}
            </button>
          </Block>

          <Block title={t("requests.filters")} Icon={AdjustmentsHorizontalIcon}>
            <FormProvider {...methods}>
              <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className={styles.form}
              >
                <div className={styles.selectedFilters}>
                  {selectedFilters?.map((filter, index) => (
                    <button
                      type="button"
                      key={index}
                      className={styles.filter}
                      onClick={() => handleRemoveFilter(filter)}
                    >
                      <div className={styles.filterLabel}>{filter.label}</div>
                      <XMarkIcon className={styles.filterIcon} />
                    </button>
                  ))}
                </div>

                <SelectField
                  label={t("requests.status")}
                  {...methods.register("status")}
                  options={[
                    { value: "all", label: t("requests.all") },
                    { value: "done", label: t("requests.done") },
                    { value: "pending", label: t("requests.pending") },
                    { value: "rejected", label: t("requests.rejected") },
                  ]}
                  onValueChange={onFilterSelect}
                />

                <DateField
                  label={t("requests.startDate")}
                  name="startDate"
                  register={methods.register}
                />
                <DateField
                  label={t("requests.endDate")}
                  name="endDate"
                  register={methods.register}
                />

                <div className={styles.buttons}>
                  <button type="submit" className={styles.submitBtn}>
                    {t("requests.applyFilters")}
                  </button>
                  <button type="button" className={styles.clearFiltersButton}>
                    {t("requests.clearFilters")}
                  </button>
                </div>
              </form>
            </FormProvider>
          </Block>
        </div>
      </div>
    </div>
  );
}
