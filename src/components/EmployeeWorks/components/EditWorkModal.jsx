import React, { useEffect } from "react";
import styles from "./EditWorkModal.module.css";
import { FormProvider, useForm } from "react-hook-form";
import { XMarkIcon } from "@heroicons/react/24/solid";
import InputField from "../../../common/InputField/InputField";
import SelectField from "../../../common/SelectField/SelectField";
import DateField from "../../../common/DateField/DateField";
import Button from "../../../common/Button/Button";

const seriousnessOptions = [
  { value: 1, label: "Информационная" },
  { value: 2, label: "Важная" },
];

const categoryMap = {
  1: "Водоснабжение. Горячая вода",
  2: "Электроснабжение",
  3: "Бытовые услуги",
  4: "Санитарное состояние многоквартирного дома",
  5: "Отопление",
  6: "Благоустройство территории",
  7: "Водоснабжение",
  8: "Общестроительные работы",
  9: "Санитарное состояние территории",
  11: "Техническое обслуживание ЗПУ",
  12: "Другое",
  13: "Техническое обслуживание лифта",
  14: "Обращение с ТКО",
  15: "Водоснабжение. Холодная вода",
  16: "Канализация",
  17: "Автомобильные дороги, тротуары",
  18: "Кровельные работы",
  19: "Уличное освещение",
  20: "Общественные места (Парки, скверы)",
  21: "Работы по ремонту стыков",
  22: "Техническое обслуживание зданий и сооружений",
  23: "Рекламные и информационные конструкции и объявления",
};

export default function EditWorkModal({
  isOpen,
  onClose,
  work,
  onSave,
  categories,
}) {
  const methods = useForm({
    defaultValues: {
      title: "",
      description: "",
      category: 0,
      seriousness: 1,
      plannedStartTime: "",
      plannedEndTime: "",
      factStartTime: "",
      factEndTime: "",
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (work) {
      reset({
        title: work.title || "",
        description: work.description || "",
        category: work.category || 0,
        seriousness: work.seriousness || 1,
        plannedStartTime: work.plannedStartTime
          ? work.plannedStartTime.split("T")[0]
          : "",
        plannedEndTime: work.plannedEndTime
          ? work.plannedEndTime.split("T")[0]
          : "",
        factStartTime: work.factStartTime
          ? work.factStartTime.slice(0, 16)
          : "",
        factEndTime: work.factEndTime ? work.factEndTime.slice(0, 16) : "",
      });
    }
  }, [work, reset]);

  const onSubmit = (data) => {
    const updatedWork = {
      ...work,
      title: data.title,
      description: data.description,
      category: parseInt(data.category),
      seriousness: parseInt(data.seriousness),
      plannedStartTime: new Date(data.plannedStartTime).toISOString(),
      plannedEndTime: new Date(data.plannedEndTime).toISOString(),
      factStartTime: data.factStartTime
        ? new Date(data.factStartTime).toISOString()
        : null,
      factEndTime: data.factEndTime
        ? new Date(data.factEndTime).toISOString()
        : null,
    };
    onSave(updatedWork);
  };

  if (!isOpen) return null;

  const categoryOptions =
    categories
      ?.filter((c) => c.code !== 0)
      .map((c) => ({ value: c.code, label: c.name })) || [];

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>Редактирование работы</h2>
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
            />

            <SelectField
              name="seriousness"
              label="Серьёзность"
              options={seriousnessOptions}
              required
            />

            <div className={styles.dateRow}>
              <DateField
                name="plannedStartTime"
                label="Планируемая дата начала"
                required
              />
              <DateField
                name="plannedEndTime"
                label="Планируемая дата окончания"
                required
              />
            </div>

            <div className={styles.dateRow}>
              <DateField
                name="factStartTime"
                label="Фактическая дата начала (опционально)"
                type="datetime-local"
              />
              <DateField
                name="factEndTime"
                label="Фактическая дата окончания (опционально)"
                type="datetime-local"
              />
            </div>

            <div className={styles.actions}>
              <Button type="button" variant="secondary" onClick={onClose}>
                Отмена
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Сохранение..." : "Сохранить"}
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
