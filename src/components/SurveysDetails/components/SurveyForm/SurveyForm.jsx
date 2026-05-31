import React from "react";
import styles from "./SurveyForm.module.css";
import { FormProvider } from "react-hook-form";
import Block from "../../../../common/Block/Block";
import RadioButton from "../../../../common/RadioButton/RadioButton";
import CheckBox from "../../../../common/CheckBox/CheckBox";
import Button from "../../../../common/Button/Button";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { useT } from "../../../../utils/useT";

export default function SurveyForm({ Icon, survey, onSubmit, methods }) {
  const t = useT();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const renderAnswers = (type) => {
    if (type === 1) {
      // Одиночный выбор (Radio)
      return survey.options.map((option) => (
        <RadioButton
          key={option.id}
          {...register("surveyAnswer", {
            required: t("surveys.requiredAnswer"),
          })}
          value={option.id}
          label={option.content}
          checked={
            survey.userHasVoted ? option.id === survey.userVotes[0] : null
          }
        />
      ));
    }

    if (type === 2) {
      // Множественный выбор (Checkbox)
      return survey.options.map((option) => (
        <CheckBox
          key={option.id}
          {...register(`surveyCheckbox.${option.id}`)}
          value={option.id}
          label={option.content}
          checked={
            survey.userHasVoted ? survey.userVotes.includes(option.id) : null
          }
        />
      ));
    }

    return null;
  };

  return (
    <Block>
      <div className={styles.header}>
        <div className={styles.title}>
          <Icon type={survey.type} />
          {survey.title}{" "}
        </div>
        <div className={styles.company}>{survey.companyName}</div>
      </div>

      <div className={styles.description}>{survey.description}</div>

      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`${styles.options} ${
            survey.userHasVoted ? styles.disabled : ""
          }`}
        >
          {renderAnswers(survey.type)}

          {errors.surveyAnswer && (
            <div className={styles.errorMessage}>
              <ExclamationTriangleIcon className={styles.errorIcon} />
              {errors.surveyAnswer.message}
            </div>
          )}

          <Button type="submit" className={styles.submitBtn}>
            {survey.userHasVoted
              ? t("surveys.allReadyVoted")
              : t("surveys.vote")}
          </Button>
        </form>
      </FormProvider>
    </Block>
  );
}
