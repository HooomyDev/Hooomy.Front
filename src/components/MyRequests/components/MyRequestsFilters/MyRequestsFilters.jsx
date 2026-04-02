import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import styles from "./MyRequestsFilters.module.css";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";
import { useT } from "../../../../utils/useT";
import Block from "../../../../common/Block/Block";
import SelectField from "../../../../common/SelectField/SelectField";
import DateField from "../../../../common/DateField/DateField";
import Button from "../../../../common/Button/Button";

export default function MyRequestsFilters({ allRequests, onFilterSubmit }) {
  const t = useT();

  const methods = useForm({
    defaultValues: { status: 0, startDate: "", endDate: "" },
  });

  const onSubmit = (data) => {
    let filtered = allRequests;

    const status = Number(data.status);

    if (status !== 0) {
      filtered = filtered.filter((req) => req.status === status);
    }

    const normalizeDate = (d) => new Date(new Date(d).setHours(0, 0, 0, 0));

    if (data.startDate) {
      filtered = filtered.filter(
        (req) => normalizeDate(req.createdAt) >= normalizeDate(data.startDate)
      );
    }
    if (data.endDate) {
      filtered = filtered.filter(
        (req) => normalizeDate(req.createdAt) <= normalizeDate(data.endDate)
      );
    }

    onFilterSubmit(filtered);
  };

  const handleClearFilters = () => {
    methods.reset({ status: 0, startDate: "", endDate: "" });
    onFilterSubmit(allRequests);
  };

  return (
    <Block title={t("requests.filters")} Icon={AdjustmentsHorizontalIcon}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className={styles.form}>
          <SelectField
            label={t("requests.status")}
            {...methods.register("status")}
            options={[
              { value: 0, label: t("requests.all") },
              { value: 1, label: "Создан" },
              { value: 2, label: t("requests.rejected") },
              { value: 3, label: t("requests.pending") },
              { value: 4, label: t("requests.done") },
            ]}
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
            <Button type="submit" className={styles.submitBtn}>
              {t("requests.applyFilters")}
            </Button>
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
