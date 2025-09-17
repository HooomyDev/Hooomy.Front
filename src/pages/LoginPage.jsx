import React from "react";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import InputField from "../components/InputField";
import '../styles/styles.css';
import { Link, useNavigate } from "react-router-dom";

const schema = z.object({
  email: z.string().email('Некорректный формат почты.'),
  password: z.string().min(6, "Пароль должен быть минимум 6 символов")
});

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: zodResolver(schema) });

  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log('Авторизация успешна', data);
    navigate('/');
  };

  return (
    <div className="container">
      <h2>Вход</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          className="input-field"
          label="Почта"
          name="email"
          register={register}
          error={errors.email?.message}
        />

        <InputField
          className="input-field"
          label="Пароль"
          name="password"
          type="password"
          register={register}
          error={errors.password?.message}
        />

        <button type="submit" className="submit">Войти</button>

        <p className="auth-link">
          Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
        </p>

        <div className="form-footer">
          © Hooomy | Все права защищены
        </div>
      </form>
    </div>
  );
}
