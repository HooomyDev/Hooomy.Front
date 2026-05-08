import React, { useState } from "react";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import styles from "./EmployeeSurveysCreateForm.module.css";
import InputField from "../../../../common/InputField/InputField";
import SelectField from "../../../../common/SelectField/SelectField";
import Button from "../../../../common/Button/Button";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useT } from "../../../../utils/useT";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSurvay } from "../../../../api/services/survaceService";
import { useAuthStore } from "../../../../stores/authStore";
import Notification from "../../../../common/Notification/Notification";

export default function EmployeeSurveysCreateForm({ onSuccess }) {
  const t = useT();
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const [notification, setNotification] = useState(null);

  const methods = useForm({
    defaultValues: {
      title: "",
      description: "",
      type: 1,
      answers: [{ text: "" }, { text: "" }],
    },
  });

  const { handleSubmit, register, watch, control, reset } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "answers",
  });

  const formValues = watch();

  const filledAnswersCount = (formValues.answers || []).filter(
    (a) => a?.text && a.text.trim() !== ""
  ).length;

  const isValidForm = filledAnswersCount >= 2 && filledAnswersCount <= 5;

  const createPollMutation = useMutation({
    mutationFn: (data) =>
      createSurvay(
        data.title,
        data.description,
        user?.companyId,
        data.type,
        data.answers
          .filter((a) => a.text.trim())
          .map((a) => ({ content: a.text }))
      ),
    onSuccess: () => {
      setNotification({
        type: "success",
        message: "Опрос успешно создан",
      });
      reset();
      queryClient.invalidateQueries({ queryKey: ["surveys"] });

      if (onSuccess) {
        setTimeout(() => onSuccess(), 1500);
      }

      setTimeout(() => setNotification(null), 3000);
    },
    onError: (error) => {
      setNotification({
        type: "error",
        message:
          error.response?.data?.message ||
          t("employeeSurveysCreateForm.errorMessage"),
      });
      setTimeout(() => setNotification(null), 3000);
    },
  });

  const submitHandler = (data) => {
    if (!isValidForm) {
      setNotification({
        type: "error",
        message:
          filledAnswersCount < 2
            ? t("employeeSurveysCreateForm.minAnswersError")
            : t("employeeSurveysCreateForm.maxAnswersError"),
      });
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    createPollMutation.mutate(data);
  };

  const handleAddAnswer = () => {
    if (fields.length >= 5) {
      setNotification({
        type: "error",
        message: t("employeeSurveysCreateForm.maxAnswersError"),
      });
      setTimeout(() => setNotification(null), 3000);
      return;
    }
    append({ text: "" });
  };

  const handleRemoveAnswer = (index) => {
    if (fields.length <= 2) {
      setNotification({
        type: "error",
        message: t("employeeSurveysCreateForm.minAnswersError"),
      });
      setTimeout(() => setNotification(null), 3000);
      return;
    }
    remove(index);
  };

  return (
    <FormProvider {...methods}>
      {notification && (
        <Notification
          duration={3000}
          onClose={() => setNotification(null)}
          type={notification.type}
        >
          {notification.message}
        </Notification>
      )}

      <form onSubmit={handleSubmit(submitHandler)} className={styles.wrapper}>
        <div className={styles.blocks}>
          <InputField
            label={t("employeeSurveysCreateForm.titleLabel")}
            {...register("title", {
              required: t("employeeSurveysCreateForm.titleRequired"),
              minLength: { value: 3, message: "Минимум 3 символа" },
            })}
            placeholder={t("employeeSurveysCreateForm.titlePlaceholder")}
            required
          />

          <InputField
            label={t("employeeSurveysCreateForm.descriptionLabel")}
            {...register("description")}
            placeholder={t("employeeSurveysCreateForm.descriptionPlaceholder")}
            multiline
          />

          <SelectField
            label={t("employeeSurveysCreateForm.typeLabel")}
            name="type"
            required
            options={[
              {
                value: 1,
                label: t("employeeSurveysCreateForm.typeOptions.one"),
              },
              {
                value: 2,
                label: t("employeeSurveysCreateForm.typeOptions.more"),
              },
            ]}
          />

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
                {fields.length > 2 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveAnswer(i)}
                    className={styles.deleteButton}
                  >
                    <TrashIcon className={styles.trashIcon} />
                  </button>
                )}
              </div>
            ))}

            {fields.length < 5 && (
              <Button
                type="button"
                variant="secondary"
                onClick={handleAddAnswer}
                className={styles.addButton}
              >
                {t("employeeSurveysCreateForm.addAnswer")}
              </Button>
            )}

            <div className={styles.progressContainer}>
              <div className={styles.progressBar}>
                <div
                  className={`${styles.progressFill} ${
                    filledAnswersCount >= 2 && filledAnswersCount <= 5
                      ? styles.valid
                      : styles.invalid
                  }`}
                  style={{ width: `${(filledAnswersCount / 5) * 100}%` }}
                />
              </div>
              <div className={styles.progressText}>
                {filledAnswersCount} из 5 вариантов
                {filledAnswersCount < 2 && " (нужно минимум 2)"}
              </div>
            </div>
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          isLoading={createPollMutation.isPending}
          disabled={!isValidForm || createPollMutation.isPending}
        >
          {createPollMutation.isPending ? "Создание..." : "Создать"}
        </Button>
      </form>
    </FormProvider>
  );
}
