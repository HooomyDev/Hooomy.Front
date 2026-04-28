import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import styles from "./MyRequestsFilters.module.css";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";
import { useT } from "../../../../utils/useT";
import Block from "../../../../common/Block/Block";
import SelectField from "../../../../common/SelectField/SelectField";
import DateField from "../../../../common/DateField/DateField";
import Button from "../../../../common/Button/Button";

export default function MyRequestsFilters({
  onFilterChange,
  initialFilters = {},
  disabled,
}) {
  const t = useT();

  const methods = useForm({
    defaultValues: {
      status: initialFilters.status || 0,
      startDate: initialFilters.startDate || "",
      endDate: initialFilters.endDate || "",
    },
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = (data) => {
    const filters = {
      requestStatus: data.status !== 0 ? data.status : undefined,
      startDate: data.startDate || undefined,
      endDate: data.endDate || undefined,
    };
    onFilterChange?.(filters);
  };

  const handleClearFilters = () => {
    reset({ status: 0, startDate: "", endDate: "" });
    onFilterChange?.({
      requestStatus: undefined,
      startDate: undefined,
      endDate: undefined,
    });
  };

  const statusOptions = [
    { value: 0, label: t("requests.all") },
    { value: 1, label: "Создан" },
    { value: 2, label: "Отклонен" },
    { value: 3, label: "В работе" },
    { value: 4, label: "Завершен" },
  ];

  return (
    <Block title={t("requests.filters")} Icon={AdjustmentsHorizontalIcon}>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`${styles.form} ${disabled ? styles.formDisabled : ""}`}
        >
          <SelectField
            label={t("requests.status")}
            {...methods.register("status")}
            options={statusOptions}
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
            <Button type="submit">{t("requests.applyFilters")}</Button>
            <Button
              type="button"
              variant="secondary"
              onClick={handleClearFilters}
            >
              {t("requests.clearFilters")}
            </Button>
          </div>
        </form>
      </FormProvider>
    </Block>
  );
}
