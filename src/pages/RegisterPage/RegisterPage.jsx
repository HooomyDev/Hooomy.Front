import React from "react";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import InputField from "../../components/InputField/InputField";
import styles from "./RegisterPage.module.css";
import { Link, useNavigate } from "react-router-dom";

const schema = z.object({
  email: z.string().email('Некорректный формат почты.'),
  phoneNumber: z.string().regex(/^(\+375)(29|25|33|44)\d{7}$/, 'Номер телефона должен быть в формате "+375XXYYYYYYY."'),
  passportNumber: z.string().regex(/^[A-Z]{2}\d{7}$/, 'Номер паспорта должен быть в формате "AB1234567"'),
  password: z.string().min(6, "Пароль должен быть минимум 6 символов"),
  confirmPassword: z.string().min(6, 'Пароль должен быть минимум 6 символов')
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Пароли не совпадают',
  path: ['confirmPassword']
});

export default function RegisterPage() {
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) });
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log('Регистрация прошла успешно', data);
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Регистрация</h2>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <InputField label="Почта" name="email" register={register} error={errors.email?.message} />
        <InputField label="Номер телефона" name="phoneNumber" register={register} error={errors.phoneNumber?.message} />
        <InputField label="Номер паспорта" name="passportNumber" register={register} error={errors.passportNumber?.message} />
        <InputField label="Пароль" name="password" type="password" register={register} error={errors.password?.message} />
        <InputField label="Подтвердите пароль" name="confirmPassword" type="password" register={register} error={errors.confirmPassword?.message} />

        <button type="submit" className={styles.submit}>Зарегистрироваться</button>

        <p className={styles.authLink}>
          Уже есть аккаунт? <Link to="/login">Войти</Link>
        </p>

        <div className={styles.formFooter}>
          © Hooomy | Все права защищены
        </div>
      </form>
    </div>
  );
}
