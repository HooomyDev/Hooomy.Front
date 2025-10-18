import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegistrationWizardButtons from "../RegistrationWizardButtons/RegistrationWizardButtons";
import RegistrationProgressBar from "../RegistrationProgressBar/RegistrationProgressBar";
import RegistrationWizardContent from "../RegistrationWizardContent/RegistrationWizardContent";
import RegistrationStepAccountType from "../RegistrationStepAccountType/RegistrationStepAccountType";
import RegistrationStepCommonUserData from "../RegistrationStepCommonUserData/RegistrationStepCommonUserData";
import RegistrationStepContactUserData from "../RegistrationStepContactUserData/RegistrationStepContactUserData";
import RegistrationStepReview from "../RegistrationStepReview/RegistrationStepReview";
import RegistrationWizardWrapper from "../RegistrationWizardWrapper/RegistrationWizardWrapper";
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
  const [formData, setFormData] = useState({
    role: "",
    surname: "",
    name: "",
    patronymic: "",
    invite: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [wasSubmitted, setWasSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const steps = [
    {
      id: 1,
      component: (
        <RegistrationStepAccountType
          roles={roles}
          formData={formData}
          setFormData={setFormData}
        />
      ),
    },
    {
      id: 2,
      component: (
        <RegistrationStepCommonUserData
          formData={formData}
          setFormData={setFormData}
          wasSubmited={wasSubmitted}
          error={errors}
        />
      ),
    },
    {
      id: 3,
      component: (
        <RegistrationStepContactUserData
          formData={formData}
          setFormData={setFormData}
          wasSubmited={wasSubmitted}
          error={errors}
        />
      ),
    },
    { id: 4, component: <RegistrationStepReview formData={formData} /> },
    { id: 5, component: <RegistrationStepSuccess /> },
  ];

  // HACK: заменить на что-то лучше
  const fakeServerCheck = (code) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(code === "ABC123");
      }, 2000);
    });
  };

  const handleNext = async () => {
    setWasSubmitted(true);

    let newErrors = {};

    if (step === 2) {
      newErrors = {
        name: validateName(formData.name),
        surname: validateSurname(formData.surname),
        patronymic: validatePatronymic(formData.patronymic),
      };
    }

    if (step === 3) {
      newErrors = {
        email: validateEmail(formData.email),
        password: validatePassword(formData.password),
        confirmPassword: validateConfirmPassword(
          formData.password,
          formData.confirmPassword
        ),
      };
    }

    setErrors(newErrors);
    console.log(newErrors);

    const hasErrors = Object.values(newErrors).some((err) => err !== "");
    console.log(hasErrors);
    if (hasErrors) return;

    if (step === 2 && formData.role === "management") {
      setLoading(true);
      const isValid = await fakeServerCheck(formData.invite.trim());
      setLoading(false);

      if (!isValid) {
        setErrors((prev) => ({
          ...prev,
          invite: "Неверный инвайт-код",
        }));
        return;
      }
    }

    if (step < steps.length) {
      setStep((prev) => prev + 1);
    }

    if (step === 5) {
      // TODO: запросы на регистрацию
      console.log(formData);
      navigate("/home");
    }
  };

  const handlePrev = () => {
    if (step === 1) {
      navigate(-1);
    } else {
      setStep((prev) => prev - 1);
    }
  };

  return (
    <div className={styles.wrapper}>
      <FormHeader title="Регистрация" />
      <RegistrationProgressBar totalSteps={steps.length} activeStep={step} />
      <RegistrationWizardWrapper>
        <RegistrationWizardContent step={steps[step - 1]} />
      </RegistrationWizardWrapper>
      <RegistrationWizardButtons
        onNext={handleNext}
        onPrev={handlePrev}
        loading={loading}
      />
      <LinkTo
        link="login"
        label="Зарегистрироваться"
        text="Уже есть аккаунт?"
      />
    </div>
  );
}
