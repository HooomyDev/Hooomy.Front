import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import styles from "./MyRequestsFilters.module.css";
import { useT } from "../../utils/useT";
import Block from "../../common/Block/Block";
import SelectField from "../../common/SelectField/SelectField";
import DateField from "../../common/DateField/DateField";
import {
  AdjustmentsHorizontalIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

export default function MyRequestsFilters({
  allRequests,
  selectedFilters,
  onFilterSubmit,
  onFilterSelect,
  onRemoveFilter,
}) {
  const t = useT();

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

    onFilterSubmit(filtered);
  };

  const handleClearFilters = () => {
    methods.reset({ status: "all", startDate: "", endDate: "" });
    onFilterSelect("all");
    onFilterSubmit(allRequests);
  };

  return (
    <Block title={t("requests.filters")} Icon={AdjustmentsHorizontalIcon}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.selectedFilters}>
            {selectedFilters?.map((filter, index) => (
              <button
                type="button"
                key={index}
                className={styles.filter}
                onClick={() => onRemoveFilter(filter)}
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
            <button
              type="button"
              className={styles.clearFiltersButton}
              onClick={handleClearFilters}
            >
              {t("requests.clearFilters")}
            </button>
          </div>
        </form>
      </FormProvider>
    </Block>
  );
}
