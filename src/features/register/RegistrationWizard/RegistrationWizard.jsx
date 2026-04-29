import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import RegistrationWizardButtons from "../RegistrationWizardButtons/RegistrationWizardButtons";
import RegistrationProgressBar from "../RegistrationProgressBar/RegistrationProgressBar";
import RegistrationWizardContent from "../RegistrationWizardContent/RegistrationWizardContent";
import RegistrationStepCommonUserData from "../RegistrationStepCommonUserData/RegistrationStepCommonUserData";
import RegistrationStepContactUserData from "../RegistrationStepContactUserData/RegistrationStepContactUserData";
import RegistrationStepReview from "../RegistrationStepReview/RegistrationStepReview";
import RegistrationStepSuccess from "../RegistrationStepSuccess/RegistrationStepSuccess";
import styles from "./RegistrationWizard.module.css";
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateName,
  validateSurname,
  validatePatronymic,
} from "../../../utils/validation";
import FormHeader from "../../../components/FormHeader/FormHeader";
import LinkTo from "../../../common/LinkTo/LinkTo";
import SmoothlyWrapper from "../../../common/SmoothlyWrapper/SmoothlyWrapper";
import { useT } from "../../../utils/useT";
import routes from "../../../stores/routes.json";
import { authClient as client } from "../../../api/client";
import Notification from "../../../common/Notification/Notification";

export default function RegistrationWizard() {
  const t = useT();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [notification, setNotification] = useState(null);

  const methods = useForm({
    defaultValues: {
      role: "Resident",
      surname: "",
      name: "",
      patronymic: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const steps = [
    { id: 1, component: <RegistrationStepCommonUserData /> },
    { id: 2, component: <RegistrationStepContactUserData /> },
    { id: 3, component: <RegistrationStepReview /> },
    { id: 4, component: <RegistrationStepSuccess /> },
  ];

  const handleNext = async () => {
    const values = methods.getValues();

    let newErrors = {};

    if (step === 1) {
      newErrors = {
        name: validateName(values.name),
        surname: validateSurname(values.surname),
        patronymic: validatePatronymic(values.patronymic),
      };
    }

    if (step === 2) {
      newErrors = {
        email: validateEmail(values.email),
        password: validatePassword(values.password),
        confirmPassword: validateConfirmPassword(
          values.password,
          values.confirmPassword,
        ),
      };
    }

    const hasErrors = Object.values(newErrors).some((err) => err !== true);
    if (hasErrors) return;

    if (step === 3) {
      setLoading(true);
      try {
        const res = await client.post("auth/register", {
          email: values.email,
          password: values.password,
          confirmPassword: values.confirmPassword,
          role: values.role,
          surname: values.surname,
          firstName: values.name,
          patronymic: values.patronymic,
        });
        if (res.data?.errors) {
          setNotification(res.data.errors.description);
        }

        setNotification({
          type: "success",
          message: "Регистрация прошла успешно",
        });
        setStep((prev) => prev + 1);
      } catch (error) {
        console.log(error);
        setNotification({
          type: "error",
          message: error.response?.data?.errors[0].description,
        });
      } finally {
        setLoading(false);
      }
      return;
    }

    if (step < steps.length) {
      setStep((prev) => prev + 1);
    }

    if (step === 4) {
      navigate(routes.login);
    }
  };

  const handlePrev = () => {
    if (step === 1) navigate(-1);
    else setStep((prev) => prev - 1);
  };

  const values = methods.watch();

  const isNextDisabled =
    loading ||
    (step === 1 &&
      (validateSurname(values.surname) !== true ||
        validateName(values.name) !== true ||
        validatePatronymic(values.patronymic) !== true)) ||
    (step === 2 &&
      (validateEmail(values.email) !== true ||
        validatePassword(values.password) !== true ||
        validateConfirmPassword(values.password, values.confirmPassword) !==
          true));

  return (
    <div className={styles.wrapper}>
      {notification && (
        <Notification
          duration={3000}
          onClose={() => setNotification(null)}
          type={notification.type}
        >
          <div>{notification.message}</div>
        </Notification>
      )}
      <FormProvider {...methods}>
        <form className={styles.form}>
          <FormHeader title={t("register.title")} />
          <RegistrationProgressBar
            totalSteps={steps.length}
            activeStep={step}
          />
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
            link={routes.login}
            label={t("register.messageLink")}
            text={t("register.message")}
          />
        </form>
      </FormProvider>
    </div>
  );
}
