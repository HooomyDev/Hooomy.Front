import React from "react";
import styles from "./EmployeeSurveysList.module.css";
import Survey from "../../features/Surveys/Survey";

export default function EmployeeSurveysList({ items = [] }) {
  if (!items.length) {
    return <div className={styles.empty}>Нет доступных опросов</div>;
  }

  return (
    <div className={styles.listWrapper}>
      {items.map((survey) => (
        <div key={survey.id} className={styles.listItem}>
          <Survey
            title={survey.title}
            description={survey.description}
            type={survey.type}
            answers={survey.answers}
            status={survey.status}
          />
        </div>
      ))}
    </div>
  );
}
