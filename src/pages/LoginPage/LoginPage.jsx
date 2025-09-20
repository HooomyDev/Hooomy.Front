import React from "react";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import InputField from "../../components/InputField/InputField";
import styles from "./LoginPage.module.css";
import { Link, useNavigate } from "react-router-dom";

const schema = z.object({
  email: z.string().email('Некорректный формат почты.'),
  password: z.string().min(6, "Пароль должен быть минимум 6 символов")
});

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) });
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log('Авторизация успешна', data);
    navigate('/');
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <h2 className={styles.title}>Вход</h2>

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <InputField label="Почта" name="email" register={register} error={errors.email?.message} />
          <InputField label="Пароль" name="password" type="password" register={register} error={errors.password?.message} />

          <button type="submit" className={styles.submit}>Войти</button>

          <p className={styles.authLink}>
            Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
          </p>

          <div className={styles.formFooter}>
            © Hooomy | Все права защищены
          </div>
        </form>
      </div>
    </div>
  );
}
