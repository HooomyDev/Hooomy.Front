import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Button from "../../../../common/Button/Button";
import InputField from "../../../../common/InputField/InputField";
import SelectField from "../../../../common/SelectField/SelectField";
import Loader from "../../../../common/Loader/Loader";
import styles from "./EditSurveyModal.module.css";

export default function EditSurveyModal({
  isOpen,
  onClose,
  onConfirm,
  survey,
  isLoading,
}) {
  const methods = useForm({
    defaultValues: {
      title: "",
      description: "",
      status: 1,
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (survey) {
      reset({
        title: survey.title || "",
        description: survey.description,
        status: survey.status || 1,
      });
    }
  }, [survey, reset]);

  if (!isOpen) return null;

  const onSubmit = (data) => {
    onConfirm(data);
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>Редактирование опроса</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            ×
          </button>
        </div>

        {isLoading ? (
          <div className={styles.loaderWrapper}>
            <Loader />
          </div>
        ) : (
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
              <InputField
                label="Название"
                placeholder="Введите название опроса"
                error={errors.title?.message}
                {...register("title", {
                  required: "Название обязательно",
                  minLength: {
                    value: 3,
                    message: "Название должно содержать минимум 3 символа",
                  },
                })}
              />

              <InputField name="description" label="Описание" multiline />

              <SelectField
                label="Статус"
                options={[
                  { value: 1, label: "Активный" },
                  { value: 2, label: "Завершён" },
                  { value: 3, label: "Архивирован" },
                ]}
                {...register("status")}
              />

              <div className={styles.actions}>
                <Button variant="secondary" type="button" onClick={onClose}>
                  Отмена
                </Button>
                <Button type="submit" disabled={isLoading}>
                  Сохранить
                </Button>
              </div>
            </form>
          </FormProvider>
        )}
      </div>
    </div>
  );
}
