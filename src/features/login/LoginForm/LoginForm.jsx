import React, { useState } from "react";
import LoginFormButtons from "../LoginFormButtons/LoginFormButtons";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../stores/authStore";
import { useForm, FormProvider } from "react-hook-form";
import styles from "./LoginForm.module.css";
import FormHeader from "../../../components/FormHeader/FormHeader";
import LinkTo from "../../../common/LinkTo/LinkTo";
import InputField from "../../../common/InputField/InputField";
import { useT } from "../../../utils/useT";

export default function LoginForm() {
  const t = useT();

  const methods = useForm({
    defaultValues: { email: "", password: "" },
  });

  const navigate = useNavigate();
  const login = useAuthStore((store) => store.login);

  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    console.log("Form data:", data);

    setLoading(true);

    // имитация загрузки
    setTimeout(() => {
      login(data, "qwerty12345");
      setLoading(false);
      navigate("/");
    }, 1500);
  };

  const handlePrev = () => {
    navigate(-1);
  };

  return (
    <div className={styles.wrapper}>
      <FormHeader title={t("login.title")} />

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className={styles.form}>
          <InputField
            label={t("user.email")}
            name="email"
            placeholder={t("placeholder.email")}
            rules={{
              required: "Введите email",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Некорректный email",
              },
            }}
          />

          <InputField
            label={t("user.password")}
            name="password"
            placeholder={t("placeholder.password")}
            type="password"
            rules={{
              required: "Введите пароль",
              minLength: {
                value: 6,
                message: "Минимум 6 символов",
              },
            }}
          />

          <LoginFormButtons
            onPrev={handlePrev}
            loading={loading}
            onNext={methods.handleSubmit(onSubmit)}
          />

          <LinkTo
            label={t("login.messageLink")}
            text={t("login.message")}
            link="register"
          />
        </form>
      </FormProvider>
    </div>
  );
}
