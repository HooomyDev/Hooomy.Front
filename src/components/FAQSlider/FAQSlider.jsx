import React, { useState } from "react";
import styles from "./FAQSlider.module.css";
import {
  UserGroupIcon,
  ChatBubbleBottomCenterTextIcon,
  QuestionMarkCircleIcon,
  AcademicCapIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/solid";
import { useT } from "../../utils/useT";

export default function FAQSlider() {
  const t = useT();
  const [currentIndex, setCurrentIndex] = useState(0);

  const cards = [
    {
      id: 1,
      title: t("main.faqSlider.cards.register.title"),
      icon: UserGroupIcon,
      question: t("main.faqSlider.cards.register.question"),
      answer: t("main.faqSlider.cards.register.answer"),
    },
    {
      id: 2,
      title: t("main.faqSlider.cards.help.title"),
      icon: ChatBubbleBottomCenterTextIcon,
      question: t("main.faqSlider.cards.help.question"),
      answer: t("main.faqSlider.cards.help.answer"),
    },
    {
      id: 3,
      title: t("main.faqSlider.cards.common.title"),
      icon: QuestionMarkCircleIcon,
      question: t("main.faqSlider.cards.common.question"),
      answer: t("main.faqSlider.cards.common.answer"),
    },
    {
      id: 4,
      title: t("main.faqSlider.cards.documents.title"),
      icon: DocumentTextIcon,
      question: t("main.faqSlider.cards.documents.question"),
      answer: t("main.faqSlider.cards.documents.answer"),
    },
    {
      id: 5,
      title: t("main.faqSlider.cards.support.title"),
      icon: AcademicCapIcon,
      question: t("main.faqSlider.cards.support.question"),
      answer: t("main.faqSlider.cards.support.answer"),
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
      <h2 className={styles.title}>{t("main.faqSlider.title")}</h2>
      <div className={styles.sliderContainer}>
        <button
          onClick={handlePrev}
          className={styles.navButton}
          aria-label={t("main.faqSlider.prevSlide")}
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
          aria-label={t("main.faqSlider.nextSlide")}
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
            aria-label={t("main.faqSlider.goToSlide", { number: index + 1 })}
          />
        ))}
      </div>
    </div>
  );
}
