import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import {
  CheckCircleIcon,
  ClipboardDocumentCheckIcon,
  SignalIcon,
  PencilSquareIcon,
  StarIcon,
} from "@heroicons/react/24/solid";
import styles from "./Survey.module.css";
import ScaleInput from "../../common/ScaleInput/ScaleInput";
import RadioButton from "../../common/RadioButton/RadioButton";
import CheckBox from "../../common/CheckBox/CheckBox";
import InputField from "../../common/InputField/InputField";
import Button from "../../common/Button/Button";
import { useT } from "../../utils/useT";

export default function Survey({
  title = "Survey Title",
  type = "one",
  description = "",
  answers = [],
  status = "active",
}) {
  const t = useT();
  const methods = useForm();
  const { handleSubmit } = methods;

  const onSubmit = (data) => {
    console.log("Ответы:", data);
  };

  const iconMap = {
    one: CheckCircleIcon,
    more: ClipboardDocumentCheckIcon,
    scale: SignalIcon,
    text: PencilSquareIcon,
  };

  const Icon = ({ type }) => {
    const IconComponent = iconMap[type];
    return IconComponent ? (
      <IconComponent className={styles.surveyIcon} />
    ) : (
      <StarIcon className={styles.surveyIcon} />
    );
  };

  const renderAnswers = () => {
    if (type === "one") {
      return answers.map((answer, index) => (
        <RadioButton
          key={answer.id || index}
          type="radio"
          {...methods.register("survey")}
          value={answer.id}
          className={styles.radioInput}
          label={answer.text}
        />
      ));
    }

    if (type === "more") {
      return answers.map((answer, index) => (
        <CheckBox
          key={answer.id || index}
          type="checkbox"
          {...methods.register(`survey.${answer.id}`)}
          value={answer.id}
          className={styles.checkBoxInput}
          label={answer.text}
        />
      ));
    }

    if (type === "scale") {
      return <ScaleInput register={methods.register} />;
    }

    if (type === "text") {
      return (
        <InputField
          type="text"
          {...methods.register("surveyText")}
          placeholder="Введите ваш ответ"
          multiline
        />
      );
    }

    return null;
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.wrapper}>
        <div className={styles.title}>
          <Icon type={type} />
          {title}
        </div>

        <div className={styles.description}>{description}</div>

        <div
          className={`${styles.answers} ${
            status === "finished" ? styles.disabled : ""
          }`}
          disabled={status === "finished"}
        >
          {renderAnswers()}
        </div>

        <Button
          type="submit"
          variant="primary"
          disabled={status === "finished"}
        >
          {t("surveys.voite")}
        </Button>
      </form>
    </FormProvider>
  );
}
