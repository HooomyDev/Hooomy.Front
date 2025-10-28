import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import RegistrationWizardButtons from "../RegistrationWizardButtons/RegistrationWizardButtons";
import RegistrationProgressBar from "../RegistrationProgressBar/RegistrationProgressBar";
import RegistrationWizardContent from "../RegistrationWizardContent/RegistrationWizardContent";
import RegistrationStepAccountType from "../RegistrationStepAccountType/RegistrationStepAccountType";
import RegistrationStepCommonUserData from "../RegistrationStepCommonUserData/RegistrationStepCommonUserData";
import RegistrationStepContactUserData from "../RegistrationStepContactUserData/RegistrationStepContactUserData";
import RegistrationStepReview from "../RegistrationStepReview/RegistrationStepReview";
import SmoothlyWrapper from "../SmoothlyWrapper/SmoothlyWrapper";
import RegistrationStepSuccess from "../RegistrationStepSuccess/RegistrationStepSuccess";
import styles from "./RegistrationWizard.module.css";
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateName,
  validateSurname,
  validatePatronymic,
} from "../../utils/validation";
import FormHeader from "../FormHeader/FormHeader";
import LinkTo from "../LinkTo/LinkTo";

const roles = [
  { value: "resident", label: "Жилец" },
  { value: "management", label: "Сотрудник" },
];

export default function RegistrationWizard() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const methods = useForm({
    defaultValues: {
      role: "",
      surname: "",
      name: "",
      patronymic: "",
      invite: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const steps = [
    { id: 1, component: <RegistrationStepAccountType roles={roles} /> },
    { id: 2, component: <RegistrationStepCommonUserData /> },
    { id: 3, component: <RegistrationStepContactUserData /> },
    { id: 4, component: <RegistrationStepReview /> },
    { id: 5, component: <RegistrationStepSuccess /> },
  ];

  const fakeServerCheck = (code) =>
    new Promise((resolve) => {
      setTimeout(() => resolve(code === "ABC123"), 2000);
    });

  const handleNext = async () => {
    const values = methods.getValues();

    let newErrors = {};

    if (step === 1 && !values.role) {
      newErrors.role = "Выберите роль";
    }

    if (step === 2) {
      newErrors = {
        name: validateName(values.name),
        surname: validateSurname(values.surname),
        patronymic: validatePatronymic(values.patronymic),
      };
    }

    if (step === 3) {
      newErrors = {
        email: validateEmail(values.email),
        password: validatePassword(values.password),
        confirmPassword: validateConfirmPassword(
          values.password,
          values.confirmPassword
        ),
      };
    }

    const hasErrors = Object.values(newErrors).some((err) => err !== "");
    if (hasErrors) return;

    if (step === 2 && values.role === "management") {
      setLoading(true);
      const isValid = await fakeServerCheck(values.invite.trim());
      setLoading(false);

      if (!isValid) {
        return;
      }
    }

    if (step === 4) {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
      setStep((prev) => prev + 1);
      return;
    }

    if (step < steps.length) {
      setStep((prev) => prev + 1);
    }

    if (step === 5) {
      console.log(values);
      navigate("/home");
    }
  };

  const handlePrev = () => {
    if (step === 1) navigate(-1);
    else setStep((prev) => prev - 1);
  };

  const values = methods.watch();

  const isNextDisabled =
    loading ||
    (step === 1 && !values.role) ||
    (step === 2 &&
      (validateSurname(values.surname) !== "" ||
        validateName(values.name) !== "" ||
        validatePatronymic(values.patronymic) !== "")) ||
    (step === 3 &&
      (validateEmail(values.email) !== "" ||
        validatePassword(values.password) !== "" ||
        validateConfirmPassword(values.password, values.confirmPassword) !==
          ""));

  return (
    <FormProvider {...methods}>
      <div className={styles.wrapper}>
        <FormHeader title="Регистрация" />
        <RegistrationProgressBar totalSteps={steps.length} activeStep={step} />
        <SmoothlyWrapper>
          <RegistrationWizardContent step={steps[step - 1]} />
        </SmoothlyWrapper>
        <RegistrationWizardButtons
          onNext={handleNext}
          onPrev={handlePrev}
          loading={loading}
          disabledNext={isNextDisabled}
        />
        <LinkTo
          link="login"
          label="Зарегистрироваться"
          text="Уже есть аккаунт?"
        />
      </div>
    </FormProvider>
  );
}
