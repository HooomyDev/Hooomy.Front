import React, { useState } from "react";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import styles from "./EmployeeSurveysCreateForm.module.css";
import InputField from "../../common/InputField/InputField";
import SelectField from "../../common/SelectField/SelectField";
import Button from "../../common/Button/Button";
import Survey from "../../features/Surveys/Survey";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useT } from "../../utils/useT";

export default function EmployeeSurveysCreateForm({ onSubmit }) {
  const t = useT();

  const [previewMode, setPreviewMode] = useState(false);

  const methods = useForm({
    defaultValues: {
      title: "",
      description: "",
      type: "one",
      answers: [{ text: "" }, { text: "" }],
      status: "active",
    },
  });

  const { handleSubmit, register, watch, control, trigger } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "answers",
  });

  const formValues = watch();

  const submitHandler = (data) => {
    console.log("Созданный опрос:", data);
    if (onSubmit) onSubmit(data);
  };

  const handleContinue = async () => {
    const valid = await trigger("title");
    if (!valid) return;
    const filledAnswers = (formValues.answers || []).filter(
      (a) => a?.text && a.text.trim() !== ""
    );
    if (filledAnswers.length < 2) return;
    setPreviewMode(true);
  };

  return (
    <FormProvider {...methods}>
      {!previewMode ? (
        <form onSubmit={handleSubmit(submitHandler)} className={styles.wrapper}>
          <div className={styles.blocks}>
            <div className={styles.block}>
              <InputField
                label={t("employeeSurveysCreateForm.titleLabel")}
                {...register("title", {
                  required: t("employeeSurveysCreateForm.titleRequired"),
                })}
                placeholder={t("employeeSurveysCreateForm.titlePlaceholder")}
                required
              />

              <InputField
                label={t("employeeSurveysCreateForm.descriptionLabel")}
                {...register("description")}
                placeholder={t(
                  "employeeSurveysCreateForm.descriptionPlaceholder"
                )}
                multiline
              />
            </div>

            <div className={styles.block}>
              <SelectField
                label={t("employeeSurveysCreateForm.typeLabel")}
                name="type"
                required
                options={[
                  {
                    value: "one",
                    label: t("employeeSurveysCreateForm.typeOptions.one"),
                  },
                  {
                    value: "more",
                    label: t("employeeSurveysCreateForm.typeOptions.more"),
                  },
                  {
                    value: "text",
                    label: t("employeeSurveysCreateForm.typeOptions.text"),
                  },
                  {
                    value: "scale",
                    label: t("employeeSurveysCreateForm.typeOptions.scale"),
                  },
                ]}
              />
            </div>

            <div className={styles.block}>
              <label className={styles.label}>
                {t("employeeSurveysCreateForm.answersLabel")}
              </label>
              {fields.map((field, i) => (
                <div key={field.id} className={styles.answerRow}>
                  <InputField
                    {...register(`answers.${i}.text`, {
                      required: t("employeeSurveysCreateForm.answerRequired"),
                    })}
                    placeholder={`${t(
                      "employeeSurveysCreateForm.answerPlaceholder"
                    )} ${i + 1}`}
                  />
                  <button
                    type="button"
                    variant="secondary"
                    onClick={() => remove(i)}
                    className={styles.deleteButton}
                  >
                    <TrashIcon className={styles.trashIcon} />
                  </button>
                </div>
              ))}
              <Button
                type="button"
                variant="secondary"
                onClick={() => append({ text: "" })}
                className={styles.addButton}
              >
                {t("employeeSurveysCreateForm.addAnswer")}
              </Button>
            </div>
          </div>

          <Button type="button" variant="primary" onClick={handleContinue}>
            {t("employeeSurveysCreateForm.continue")}
          </Button>
        </form>
      ) : (
        <div className={styles.preview}>
          <Survey
            title={formValues.title}
            description={formValues.description}
            type={formValues.type}
            answers={(formValues.answers || []).filter((a) => a.text)}
            status={formValues.status}
          />
          <div className={styles.previewActions}>
            <Button variant="secondary" onClick={() => setPreviewMode(false)}>
              {t("employeeSurveysCreateForm.back")}
            </Button>
            <Button variant="primary" onClick={handleSubmit(submitHandler)}>
              {t("employeeSurveysCreateForm.create")}
            </Button>
          </div>
        </div>
      )}
    </FormProvider>
  );
}
