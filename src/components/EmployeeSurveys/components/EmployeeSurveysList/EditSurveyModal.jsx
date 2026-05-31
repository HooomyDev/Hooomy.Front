import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Button from "../../../../common/Button/Button";
import InputField from "../../../../common/InputField/InputField";
import SelectField from "../../../../common/SelectField/SelectField";
import Loader from "../../../../common/Loader/Loader";
import styles from "./EditSurveyModal.module.css";
import { useT } from "../../../../utils/useT";

export default function EditSurveyModal({
  isOpen,
  onClose,
  onConfirm,
  survey,
  isLoading,
}) {
  const t = useT();
  const methods = useForm({
    defaultValues: {
      title: survey?.title,
      description: survey?.description,
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
          <h2 className={styles.title}>
            {t("employeeSurveysEditModal.title")}
          </h2>
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
                label={t("employeeSurveysEditModal.nameLabel")}
                placeholder={t("employeeSurveysEditModal.namePlaceholder")}
                error={errors.title?.message}
                {...register("title", {
                  required: t("employeeSurveysEditModal.nameRequired"),
                  minLength: {
                    value: 3,
                    message: t("employeeSurveysEditModal.nameMinLength", {
                      count: 3,
                    }),
                  },
                })}
              />

              <InputField
                name="description"
                label={t("employeeSurveysEditModal.descriptionLabel")}
                placeholder={t(
                  "employeeSurveysEditModal.descriptionPlaceholder",
                )}
                multiline
              />

              <SelectField
                label={t("employeeSurveysEditModal.statusLabel")}
                options={[
                  {
                    value: 1,
                    label: t("employeeSurveysEditModal.statusOptions.active"),
                  },
                  {
                    value: 2,
                    label: t(
                      "employeeSurveysEditModal.statusOptions.completed",
                    ),
                  },
                  {
                    value: 3,
                    label: t("employeeSurveysEditModal.statusOptions.archived"),
                  },
                ]}
                {...register("status")}
              />

              <div className={styles.actions}>
                <Button variant="secondary" type="button" onClick={onClose}>
                  {t("employeeSurveysEditModal.cancel")}
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {t("employeeSurveysEditModal.save")}
                </Button>
              </div>
            </form>
          </FormProvider>
        )}
      </div>
    </div>
  );
}
