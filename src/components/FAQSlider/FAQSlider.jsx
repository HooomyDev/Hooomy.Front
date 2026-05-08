import React, { useState } from "react";
import styles from "./FAQSlider.module.css";
import {
  UserGroupIcon,
  ChatBubbleBottomCenterTextIcon,
  QuestionMarkCircleIcon,
  AcademicCapIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/solid";

export default function FAQSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const cards = [
    {
      id: 1,
      title: "Регистрация",
      icon: UserGroupIcon,
      question: "Как зарегистрироваться на портале?",
      answer:
        "Нажмите кнопку «Войти» в правом верхнем углу и следуйте шагам регистрации.",
    },
    {
      id: 2,
      title: "Поддержка",
      icon: ChatBubbleBottomCenterTextIcon,
      question: "Где можно получить помощь?",
      answer:
        "Вы можете связаться с нами по email или телефону из раздела Контакты.",
    },
    {
      id: 3,
      title: "Частые вопросы",
      icon: QuestionMarkCircleIcon,
      question: "Какие вопросы наиболее часто задают?",
      answer:
        "Частые вопросы касаются регистрации, восстановления пароля и подачи заявок.",
    },
    {
      id: 4,
      title: "Документы",
      icon: DocumentTextIcon,
      question: "Где найти документы?",
      answer: "Документы доступны в разделе Документы в футере сайта.",
    },
    {
      id: 5,
      title: "Техническая поддержка",
      icon: AcademicCapIcon,
      question: "Как связаться с поддержкой?",
      answer:
        "Свяжитесь с нами по email hooomy.help.by@gmail.com или звонку +375 (44) 569-10-58.",
    },
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? cards.length - 3 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= cards.length - 3 ? 0 : prev + 1));
  };

  const visibleCards = [
    cards[currentIndex],
    cards[(currentIndex + 1) % cards.length],
    cards[(currentIndex + 2) % cards.length],
  ];

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Часто задаваемые вопросы</h2>
      <div className={styles.sliderContainer}>
        <button
          onClick={handlePrev}
          className={styles.navButton}
          aria-label="Предыдущий слайд"
        >
          <svg
            className={styles.navIcon}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <div className={styles.cardsGrid}>
          {visibleCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div key={card.id} className={styles.card}>
                <div className={styles.cardHeader}>
                  <Icon className={styles.cardIcon} />
                  <div className={styles.cardTitle}>{card.title}</div>
                </div>
                <div className={styles.cardContent}>
                  <div className={styles.question}>{card.question}</div>
                  <p className={styles.answer}>{card.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
        <button
          onClick={handleNext}
          className={styles.navButton}
          aria-label="Следующий слайд"
        >
          <svg
            className={styles.navIcon}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
      <div className={styles.dots}>
        {[1, 2, 3].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`${styles.dot} ${
              index === currentIndex ? styles.activeDot : ""
            }`}
            aria-label={`Перейти к слайду ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
