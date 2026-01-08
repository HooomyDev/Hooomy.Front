import React, { useState } from "react";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import styles from "./EmployeeSurveysCreateForm.module.css";
import InputField from "../../common/InputField/InputField";
import SelectField from "../../common/SelectField/SelectField";
import Button from "../../common/Button/Button";
import Survey from "../../features/Surveys/Survey";
import { TrashIcon } from "@heroicons/react/24/solid";

export default function EmployeeSurveysCreateForm({ onSubmit }) {
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
                label="Название опроса"
                {...register("title", { required: "Введите название опроса" })}
                placeholder="Введите название"
                required
                rules={{
                  required: "Введите название",
                }}
              />

              <InputField
                label="Описание"
                {...register("description")}
                placeholder="Введите описание"
                multiline
              />
            </div>

            <div className={styles.block}>
              <SelectField
                label="Тип опроса"
                name="type"
                required
                options={[
                  { value: "one", label: "Один вариант" },
                  { value: "more", label: "Несколько вариантов" },
                  { value: "text", label: "Текстовый ответ" },
                  { value: "scale", label: "Шкала" },
                ]}
              />
            </div>

            <div className={styles.block}>
              <label className={styles.label}>Варианты ответов</label>
              {fields.map((field, i) => (
                <div key={field.id} className={styles.answerRow}>
                  <InputField
                    {...register(`answers.${i}.text`, {
                      required: "Введите вариант",
                    })}
                    placeholder={`Вариант ${i + 1}`}
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
                + Добавить вариант
              </Button>
            </div>
          </div>

          <Button type="button" variant="primary" onClick={handleContinue}>
            Далее
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
              Назад
            </Button>
            <Button variant="primary" onClick={handleSubmit(submitHandler)}>
              Создать
            </Button>
          </div>
        </div>
      )}
    </FormProvider>
  );
}
