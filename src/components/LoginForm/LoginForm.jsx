import React, { useState } from "react";
import styles from "./LoginForm.module.css";
import FormHeader from "../FormHeader/FormHeader";
import LinkTo from "../LinkTo/LinkTo";
import LoginFormButtons from "../LoginFormButtons/LoginFormButtons";
import InputField from "../InputField/InputField";
import { useNavigate } from "react-router-dom";
import { validateEmail, validatePassword } from "../../utils/validation";

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [wasSubmitted, setWasSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleNext = () => {
    setWasSubmitted(true);

    const newErrors = {
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(Boolean);
    if (hasErrors) return;

    setLoading(true);

    // TODO: добавить запрос на авторизацию
    setTimeout(() => {
      navigate("/home");
    }, 1000);
  };

  const handlePrev = () => {
    navigate(-1);
  };

  return (
    <div className={styles.wrapper}>
      <FormHeader title="Вход" />

      <InputField
        label="Email"
        name="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        error={wasSubmitted ? errors.email : ""}
      />

      <InputField
        label="Пароль"
        name="password"
        type="password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        error={wasSubmitted ? errors.password : ""}
      />

      <LoginFormButtons
        onPrev={handlePrev}
        onNext={handleNext}
        loading={loading}
      />

      <LinkTo label="Зарегистрироваться" text="Нет аккаунта?" link="register" />
    </div>
  );
}
