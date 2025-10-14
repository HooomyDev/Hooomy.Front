import React, { useState } from "react";
import styles from "./RegistrationWizard.module.css";
import RegistrationWizardButtons from "../RegistrationWizardButtons/RegistrationWizardButtons";
import RegistrationProgressBar from "../RegistrationProgressBar/RegistrationProgressBar";
import RegistrationWizardContent from "../RegistrationWizardContent/RegistrationWizardContent";
import RegistrationStepAccountType from "../RegistrationStepAccountType/RegistrationStepAccountType";
import RegistrationStepCommonUserData from "../RegistrationStepCommonUserData/RegistrationStepCommonUserData";
import RegistrationStepContactUserData from "../RegistrationStepContactUserData/RegistrationStepContactUserData";
import RegistrationStepReview from "../RegistrationStepReview/RegistrationStepReview";
import RegistrationWizardWrapper from "../RegistrationWizardWrapper/RegistrationWizardWrapper";
import RegistrationLinkToLogin from "../RegistrationLinkToLogin/RegistrationLinkToLogin";
import { useNavigate } from "react-router-dom";

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
        />
      ),
    },
    {
      id: 3,
      component: (
        <RegistrationStepContactUserData
          formData={formData}
          setFormData={setFormData}
        />
      ),
    },
    { id: 4, component: <RegistrationStepReview formData={formData} /> },
  ];

  //имитация проверки инвайт-кода для сотруников
  const fakeServerCheck = (code) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(code === "ABC123");
      }, 2000);
    });
  };

  const handleNext = async () => {
    if (step === 2 && formData.role === "management") {
      setLoading(true);
      const isValid = await fakeServerCheck(formData.invite.trim());
      setLoading(false);

      if (!isValid) return;
    }

    if (step < steps.length) {
      setStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (step === 1) {
      navigate(-1);
    } else {
      setStep((prev) => prev - 1);
    }
  };

  const isStepValid = () => {
    if (step === 1) return !!formData.role;
    if (step === 2) {
      if (formData.role === "management") {
        return formData.surname && formData.name && formData.invite;
      }
      return formData.surname && formData.name;
    }
    if (step === 3)
      return (
        formData.email &&
        formData.password &&
        formData.confirmPassword &&
        formData.password === formData.confirmPassword
      );

    return true;
  };

  return (
    <div className={styles.wrapper}>
      <RegistrationProgressBar totalSteps={steps.length} activeStep={step} />
      <RegistrationWizardWrapper>
        <RegistrationWizardContent step={steps[step - 1]} />
      </RegistrationWizardWrapper>
      <RegistrationWizardButtons
        onNext={handleNext}
        onPrev={handlePrev}
        isPrevDisabled={loading}
        isNextDisabled={!isStepValid()}
        loading={loading}
      />
      <RegistrationLinkToLogin />
    </div>
  );
}
