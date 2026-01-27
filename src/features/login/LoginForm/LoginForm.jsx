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
import routes from "../../../stores/routes.json";
import { authClient as client } from "../../../api/client";

export default function LoginForm() {
  const t = useT();

  const methods = useForm({
    defaultValues: { email: "", password: "", role: "" },
  });

  const navigate = useNavigate();
  const login = useAuthStore((store) => store.login);

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await client.post("/login", {
        email: data.email,
        password: data.password,
        returnUrl: "/",
      });

      const result = response.data;
      console.log("Login success:", result);

      login(data, result.token);

      if (data.role === "admin") {
        navigate(routes.adminDashboard);
      } else {
        navigate(routes.home);
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert(error.response?.data?.message || "Ошибка авторизации");
    } finally {
      setLoading(false);
    }
  };

  const handlePrev = () => {
    navigate(-1);
  };

  return (
    <div className={styles.wrapper}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className={styles.form}>
          <FormHeader title={t("login.title")} />
          <InputField
            label={t("user.email")}
            name="email"
            placeholder={t("placeholder.email")}
            rules={{
              required: t("errors.requiredEmail"),
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: t("errors.invalidEmail"),
              },
            }}
          />

          <InputField
            label={t("user.password")}
            name="password"
            placeholder={t("placeholder.password")}
            type="password"
            rules={{
              required: t("errors.requiredPassword"),
              minLength: {
                value: 6,
                message: t("errors.shortPassword"),
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
            link={routes.register}
          />
        </form>
      </FormProvider>
    </div>
  );
}
