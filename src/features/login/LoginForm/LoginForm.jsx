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
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default function LoginForm() {
  const t = useT();

  const methods = useForm({
    defaultValues: { email: "", password: "" },
  });

  const navigate = useNavigate();
  const login = useAuthStore((store) => store.login);

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("client_id", "react-password-client");
      params.append("grant_type", "password");
      params.append("username", data.email);
      params.append("password", data.password);
      params.append("scope", "openid profile HooomeWebApi");

      const response = await axios.post(
        "https://localhost:5001/connect/token",
        params,
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );

      const result = response.data;

      localStorage.setItem("access_token", result.access_token);

      const decoded = jwtDecode(result.access_token);

      const user = {
        email: decoded.email,
        role: decoded.role,
        surname: decoded.family_name,
        firstName: decoded.given_name,
        patronymic: decoded.middle_name,
        phoneNumber: decoded.phone_number,
      };

      login(user);

      if (user.role === "Admin") {
        navigate(routes.adminDashboard);
      } else {
        navigate(routes.home);
      }
    } catch (error) {
      console.error("Login failed:", error);
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
