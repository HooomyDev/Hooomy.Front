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
import { getCompanies } from "../../../api/services/companyService";

export default function RegistrationWizard() {
  const t = useT();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [notification, setNotification] = useState(null);

  const roles = [
    { value: "Resident", label: t("register.step1Var1") },
    { value: "Employee", label: t("register.step1Var2") },
  ];

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
      newErrors.role = t("errors.requaredRole");
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

    const hasErrors = Object.values(newErrors).some((err) => err !== true);
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
      try {
        // const companies = await getCompanies();
        // const companyId = values.role === "Employee" ? companies[0].id : null;

        const res = await client.post("auth/register", {
          email: values.email,
          password: values.password,
          confirmPassword: values.confirmPassword,
          role: values.role,
          surname: values.surname,
          firstName: values.name,
          patronymic: values.patronymic,
          //companyId: companyId,
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

    if (step === 5) {
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
    (step === 1 && !values.role) ||
    (step === 2 &&
      (validateSurname(values.surname) !== true ||
        validateName(values.name) !== true ||
        validatePatronymic(values.patronymic) !== true)) ||
    (step === 3 &&
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
