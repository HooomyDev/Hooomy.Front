import React from "react";
import styles from "./EmployeeSurveysStat.module.css";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

export default function EmployeeSurveysStat({ survey }) {
  if (!survey) return null;

  const totalVotes = survey.voteCount;
  const optionsWithPercentage = survey.options?.map((option) => ({
    ...option,
    percentage: totalVotes > 0 ? (option.voteCount / totalVotes) * 100 : 0,
  }));

  return (
    <div className={styles.statContainer}>
      {/* Описание */}
      {survey.description && (
        <>
          <h3 className={styles.sectionTitle}>Описание</h3>
          <div className={styles.description}>
            <p>{survey.description}</p>
          </div>
        </>
      )}

      {/* Результаты опроса */}
      <div className={styles.resultsSection}>
        <h3 className={styles.sectionTitle}>Результаты</h3>
        <div className={styles.optionsList}>
          {optionsWithPercentage?.map((option, index) => (
            <div key={option.id} className={styles.optionItem}>
              <div className={styles.optionHeader}>
                <span className={styles.optionLetter}>
                  {String.fromCharCode(65 + index)}
                </span>
                <span className={styles.optionText}>{option.content}</span>
                <span className={styles.optionVotes}>
                  {option.voteCount} голосов
                </span>
              </div>
              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{ width: `${option.percentage}%` }}
                />
              </div>
              <div className={styles.optionPercentage}>
                {option.percentage.toFixed(1)}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Итоговая статистика */}
      <div className={styles.footerStats}>
        <div className={styles.statItem}>
          <CheckCircleIcon className={styles.statIcon} />
          <span>Участвовало: {totalVotes} чел.</span>
        </div>
        <div className={styles.statItem}>
          <XCircleIcon className={styles.statIcon} />
          <span>Вариантов: {survey.options?.length}</span>
        </div>
      </div>
    </div>
  );
}
