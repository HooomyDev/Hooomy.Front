import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { MagnifyingGlassIcon, FunnelIcon } from "@heroicons/react/24/solid";
import InputField from "../../common/InputField/InputField";
import SelectField from "../../common/SelectField/SelectField";
import styles from "./EmployeeRequestsControls.module.css";
import { useT } from "../../utils/useT";

export default function EmployeeRequestsControls({ onSubmit }) {
  const t = useT();
  const methods = useForm({
    defaultValues: {
      searchTerm: "",
      statusFilter: "all",
    },
  });

  const { register, handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.controls}>
        <div className={styles.search}>
          <MagnifyingGlassIcon className={styles.searchIcon} />
          <InputField
            type="text"
            placeholder={t("employeeRequestsControls.searchPlaceholder")}
            {...register("searchTerm")}
          />
        </div>

        <div className={styles.filters}>
          <FunnelIcon className={styles.filterIcon} />
          <SelectField
            name="statusFilter"
            options={[
              {
                value: "all",
                label: t("employeeRequestsControls.filters.all"),
              },
              {
                value: "В обработке",
                label: t("employeeRequestsControls.filters.pending"),
              },
              {
                value: "Выполнено",
                label: t("employeeRequestsControls.filters.completed"),
              },
              {
                value: "Отклонено",
                label: t("employeeRequestsControls.filters.rejected"),
              },
            ]}
          />
        </div>
      </form>
    </FormProvider>
  );
}
