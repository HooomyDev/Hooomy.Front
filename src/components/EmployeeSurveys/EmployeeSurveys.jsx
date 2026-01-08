import React, { useEffect, useState } from "react";
import styles from "./EmployeeSurveys.module.css";
import PageHeader from "../../common/PageHeader/PageHeader";
import {
  MegaphoneIcon,
  Bars3Icon,
  Squares2X2Icon,
} from "@heroicons/react/24/solid";
import Block from "../../common/Block/Block";
import Button from "../../common/Button/Button";
import EmployeeSurveysList from "../EmployeeSurveysList/EmployeeSurveysList";
import EmployeeSurveysCreateForm from "../EmployeeSurveysCreateForm/EmployeeSurveysCreateForm";

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
    status: "active",
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
    status: "finished",
  },
];

export default function EmployeeSurveys() {
  const navItems = [
    { id: 1, label: "Создать опрос" },
    { id: 2, label: "Все опросы" },
    { id: 3, label: "Активные опросы" },
    { id: 4, label: "Архив опросов" },
  ];

  const [activeItem, setActiveItem] = useState(navItems[0].id);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setActiveItem(0);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [setActiveItem]);

  const renderContent = () => {
    switch (activeItem) {
      case 1:
        return <EmployeeSurveysCreateForm />;
      case 2:
        return <EmployeeSurveysList items={surveys} />;
      case 3:
        return (
          <EmployeeSurveysList
            items={surveys.filter((survey) => survey.status === "active")}
          />
        );
      case 4:
        return (
          <EmployeeSurveysList
            items={surveys.filter((survey) => survey.status === "finished")}
          />
        );
      case 0:
        return <div className={styles.empty}>Выберите раздел</div>;
      default:
        return <div></div>;
    }
  };

  return (
    <div className={styles.wrapper}>
      <PageHeader title="Опросы" icon={MegaphoneIcon} />

      <div className={styles.container}>
        <div className={styles.nav}>
          <Block title="Навигация" Icon={Bars3Icon}>
            <div className={styles.navItems}>
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  className={styles.navItem}
                  onClick={() => setActiveItem(item.id)}
                  variant={activeItem === item.id ? "primary" : "secondary"}
                >
                  {item.label}
                </Button>
              ))}
            </div>
          </Block>
        </div>

        <div className={styles.workplace}>
          <Block title="Рабочее пространство" Icon={Squares2X2Icon}>
            {renderContent()}
          </Block>
        </div>
      </div>
    </div>
  );
}
