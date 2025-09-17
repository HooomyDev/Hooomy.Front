// src/api/client.js
import axios from 'axios';

// Создаём экземпляр клиента с базовыми настройками
const client = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'https://localhost:7030/api',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // 10 секунд на запрос
});

// Интерсептор для добавления токена авторизации
client.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Интерсептор для обработки ошибок ответа
client.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            // Сервер вернул ответ с ошибкой
            console.error('API Error:', error.response.status, error.response.data);
            if (error.response.status === 401) {
                // Например, можно сделать logout или обновить токен
            }
        } else if (error.request) {
            // Запрос был отправлен, но ответа нет
            console.error('No response from server:', error.request);
        } else {
            // Ошибка при настройке запроса
            console.error('Request setup error:', error.message);
        }
        return Promise.reject(error);
    }
);

export default client;
