import React from "react";
import { MegaphoneIcon, BoltIcon } from "@heroicons/react/24/solid";
import styles from "./Surveys.module.css";
import Block from "../../common/Block/Block";
import Survey from "../../features/Surveys/Survey";

export default function Survays() {
  const surveys = [
    {
      id: 1,
      title: "Тестовый опрос 1",
      description: "Тестовое описание",
      type: "one",
      answers: [
        {
          id: 1,
          text: "Вариант 1",
        },
        {
          id: 2,
          text: "Вариант 2",
        },
        {
          id: 3,
          text: "Вариант 3",
        },
        {
          id: 4,
          text: "Вариант 4",
        },
        {
          id: 5,
          text: "Вариант 5",
        },
      ],
    },
    {
      id: 2,
      title: "Тестовый опрос 2",
      description: "Тестовое описание",
      type: "more",
      answers: [
        {
          id: 1,
          text: "Вариант 1",
        },
        {
          id: 2,
          text: "Вариант 2",
        },
        {
          id: 3,
          text: "Вариант 3",
        },
        {
          id: 4,
          text: "Вариант 4",
        },
        {
          id: 5,
          text: "Вариант 5",
        },
      ],
    },
    {
      id: 3,
      title: "Тестовый опрос 3",
      description: "Тестовое описание",
      type: "text",
      answers: [],
    },
    {
      id: 4,
      title: "Тестовый опрос 4",
      description: "Тестовое описание",
      type: "scale",
      answers: [],
    },
  ];

  return (
    <div className={styles.wrapper}>
      <Block>
        <div className={styles.container}>
          <MegaphoneIcon className={styles.icon} />
          <div className={styles.title}>Опросы</div>
        </div>
      </Block>

      <Block title="Активные опросы" Icon={BoltIcon}>
        {surveys.length === 0 ? (
          <div className={styles.noSurveys}>Нет активных опросов</div>
        ) : (
          <div className={styles.surveys}>
            {surveys.map((survey) => {
              return (
                <Survey
                  key={survey.id}
                  title={survey.title}
                  description={survey.description}
                  type={survey.type}
                  answers={survey.answers}
                />
              );
            })}
          </div>
        )}
      </Block>
    </div>
  );
}
