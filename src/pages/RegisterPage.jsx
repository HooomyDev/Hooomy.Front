import React from "react";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import InputField from "../components/InputField";
import '../styles/styles.css'
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

export default function RegisterPage(){
    const {
        register, 
        handleSubmit, 
        formState: {errors}
    } = useForm({resolver:zodResolver(schema)});

    const navigate = useNavigate();

    const onSubmit = (data) => {
        console.log('Регистрация прошла успешно ' + data);

        navigate('/')
    };

    return (
            <div className="container">
                <h2>Регистрация</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <InputField
                        className='input-field'
                        label='Почта'
                        name='email'
                        register={register}
                        error={errors.email?.message}/>

                    <InputField
                        className='input-field'
                        label='Номер телефона'
                        name='phoneNumber'
                        register={register}
                        error={errors.phoneNumber?.message}/>

                    <InputField
                        className='input-field'
                        label='Номер паспорта'
                        name='passportNumber'
                        register={register}
                        error={errors.passportNumber?.message}/>

                    <InputField
                        className='input-field'
                        label='Пароль'
                        name='password'
                        type='password'
                        register={register}
                        error={errors.password?.message}/>

                    <InputField
                        className='input-field'
                        label='Пароль'
                        name='confirmPassword'
                        type='password'
                        register={register}
                        error={errors.confirmPassword?.message}/>

                    <button type="submit" className='submit'>Зарегистрироваться</button>

                    <p className="auth-link">
                        Уже есть аккаунт? <Link to="/login">Войти</Link>
                    </p>
        
                    <div className="form-footer">
                        © Hooomy | Все права защищены
                    </div>
                </form>
            </div>
    )
}