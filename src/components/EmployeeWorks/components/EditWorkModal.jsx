import React, { useEffect } from "react";
import styles from "./EditWorkModal.module.css";
import { FormProvider, useForm } from "react-hook-form";
import { XMarkIcon } from "@heroicons/react/24/solid";
import InputField from "../../../common/InputField/InputField";
import SelectField from "../../../common/SelectField/SelectField";
import DateField from "../../../common/DateField/DateField";
import AutocompleteField from "../../../common/AutocompleteField/AutocompleteField";
import Button from "../../../common/Button/Button";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../../../stores/authStore";
import { getCompanyDetails } from "../../../api/services/companyService";

const seriousnessOptions = [
  { value: 1, label: "Информационная" },
  { value: 2, label: "Важная" },
];

export default function EditWorkModal({
  isOpen,
  onClose,
  work,
  onSave,
  categories,
  streetOptions = [],
  onSearchStreets,
}) {
  const { user } = useAuthStore();
  const methods = useForm({
    defaultValues: {
      title: "",
      description: "",
      category: null,
      seriousness: 1,
      address: work?.addressId || "",
      plannedStartTime: "",
      plannedEndTime: "",
      factStartTime: "",
      factEndTime: "",
    },
    mode: "onChange",
  });

  const { data: company } = useQuery({
    queryKey: ["company", user?.companyId],
    queryFn: () => getCompanyDetails(user?.companyId),
  });

  const {
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting },
  } = methods;

  const plannedStartTime = watch("plannedStartTime");
  const plannedEndTime = watch("plannedEndTime");
  const factStartTime = watch("factStartTime");
  const factEndTime = watch("factEndTime");

  useEffect(() => {
    if (work) {
      reset({
        title: work.title || "",
        description: work.description || "",
        category: work.category || 0,
        seriousness: work.seriousness || 1,
        address: work.addressId || "",
        plannedStartTime: work.plannedStartTime
          ? work.plannedStartTime.slice(0, 16)
          : "",
        plannedEndTime: work.plannedEndTime
          ? work.plannedEndTime.slice(0, 16)
          : "",
        factStartTime: work.factStartTime
          ? work.factStartTime.slice(0, 16)
          : "",
        factEndTime: work.factEndTime ? work.factEndTime.slice(0, 16) : "",
      });
    } else {
      reset({
        title: "",
        description: "",
        category: 0,
        seriousness: 1,
        address: "",
        plannedStartTime: "",
        plannedEndTime: "",
        factStartTime: "",
        factEndTime: "",
      });
    }
  }, [work, reset]);

  const onSubmit = (data) => {
    const workData = {
      ...(work && { id: work.id }),
      title: data.title,
      description: data.description,
      category: parseInt(data.category),
      seriousness: parseInt(data.seriousness),
      addressId: data.address,
      plannedStartTime: new Date(data.plannedStartTime).toISOString(),
      plannedEndTime: new Date(data.plannedEndTime).toISOString(),
      ...(work && {
        factStartTime: data.factStartTime
          ? new Date(data.factStartTime).toISOString()
          : null,
        factEndTime: data.factEndTime
          ? new Date(data.factEndTime).toISOString()
          : null,
      }),
    };
    onSave(workData);
  };

  if (!isOpen) return null;

  const categoryOptions =
    categories
      ?.filter((c) => c.code !== 0)
      .map((c) => ({ value: c.code, label: c.name })) || [];

  const addressOptions =
    company?.addresses?.map((addr) => ({
      value: addr.id,
      label: addr.fullAddress,
    })) || [];

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>{work ? "Редактирование работы" : "Создание новой работы"}</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <XMarkIcon className={styles.closeIcon} />
          </button>
        </div>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <InputField
              name="title"
              label="Название работы"
              required
              rules={{ required: "Название обязательно" }}
            />

            <InputField
              name="description"
              label="Описание"
              multiline
              rows={3}
              required
              rules={{ required: "Описание обязательно" }}
            />

            <SelectField
              name="category"
              label="Категория"
              options={categoryOptions}
              required
              rules={{ required: "Категория обязательна" }}
            />

            <SelectField
              name="seriousness"
              label="Серьёзность"
              options={seriousnessOptions}
              required
              rules={{ required: "Серьёзность обязательна" }}
            />

            <AutocompleteField
              label="Адрес"
              name="address"
              options={addressOptions}
              required
              rules={{ required: "Адрес обязателен" }}
            />

            <div className={styles.dateRow}>
              <DateField
                name="plannedStartTime"
                label="Планируемая дата и время начала"
                type="datetime-local"
                required
                rules={{
                  required: "Дата и время начала обязательны",
                  validate: (value) => {
                    if (!value || !plannedEndTime) return true;
                    return (
                      new Date(value) < new Date(plannedEndTime) ||
                      "Время начала должно быть раньше времени окончания"
                    );
                  },
                }}
              />
              <DateField
                name="plannedEndTime"
                label="Планируемая дата и время окончания"
                type="datetime-local"
                required
                rules={{
                  required: "Дата и время окончания обязательны",
                  validate: (value) => {
                    if (!value || !plannedStartTime) return true;
                    return (
                      new Date(value) > new Date(plannedStartTime) ||
                      "Время окончания должно быть позже времени начала"
                    );
                  },
                }}
              />
            </div>

            {work && (
              <div className={styles.dateRow}>
                <DateField
                  name="factStartTime"
                  label="Фактическая дата начала (опционально)"
                  type="datetime-local"
                  rules={{
                    validate: (value) => {
                      if (!value || !factEndTime) return true;
                      return (
                        new Date(value) < new Date(factEndTime) ||
                        "Время начала должно быть раньше времени окончания"
                      );
                    },
                  }}
                />
                <DateField
                  name="factEndTime"
                  label="Фактическая дата окончания (опционально)"
                  type="datetime-local"
                  rules={{
                    validate: (value) => {
                      if (!value || !factStartTime) return true;
                      return (
                        new Date(value) > new Date(factStartTime) ||
                        "Время окончания должно быть позже времени начала"
                      );
                    },
                  }}
                />
              </div>
            )}

            <div className={styles.actions}>
              <Button type="button" variant="secondary" onClick={onClose}>
                Отмена
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting
                  ? "Сохранение..."
                  : work
                    ? "Сохранить изменения"
                    : "Создать работу"}
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
