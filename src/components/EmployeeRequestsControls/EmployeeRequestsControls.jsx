import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { MagnifyingGlassIcon, FunnelIcon } from "@heroicons/react/24/solid";
import InputField from "../../common/InputField/InputField";
import SelectField from "../../common/SelectField/SelectField";
import styles from "./EmployeeRequestsControls.module.css";

export default function Controls({ onSubmit }) {
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
            placeholder="Поиск по адресу, описанию или дате..."
            {...register("searchTerm")}
          />
        </div>

        <div className={styles.filters}>
          <FunnelIcon className={styles.filterIcon} />
          <SelectField
            name="statusFilter"
            options={[
              { value: "all", label: "Все статусы" },
              { value: "В обработке", label: "В обработке" },
              { value: "Выполнено", label: "Выполненные" },
              { value: "Отклонено", label: "Отклонённые" },
            ]}
          />
        </div>
      </form>
    </FormProvider>
  );
}
