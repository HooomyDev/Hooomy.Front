import React from "react";
import styles from "./CompanyStatistics.module.css";
import Block from "../../../common/Block/Block";
import { BuildingOffice2Icon, StarIcon } from "@heroicons/react/24/solid";

export default function CompanyStatistics({ companies = [] }) {
  return (
    <Block Icon={BuildingOffice2Icon} title={"Статистика по ЖЭУ"}>
      <div className={styles.statsContainer}>
        {/* Сводная статистика */}
        <div className={styles.summaryCards}>
          <div className={styles.summaryCard}>
            <div className={styles.summaryValue}>{companies.length}</div>
            <div className={styles.summaryLabel}>Всего компаний</div>
          </div>
          <div className={styles.summaryCard}>
            <div className={styles.summaryValue}>
              {companies.reduce((sum, c) => sum + c.totalRequestCount, 0)}
            </div>
            <div className={styles.summaryLabel}>Всего заявок</div>
          </div>
          <div className={styles.summaryCard}>
            <div className={styles.summaryValue}>
              {companies.filter((c) => c.rating > 0).length}
            </div>
            <div className={styles.summaryLabel}>С оценками</div>
          </div>
        </div>

        {/* Таблица компаний */}
        <div className={styles.tableWrapper}>
          <table className={styles.statsTable}>
            <thead>
              <tr>
                <th>Компания</th>
                <th>Заявки</th>
                <th>Выполнено</th>
                <th>В работе</th>
                <th>Рейтинг</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company) => (
                <tr key={company.companyId}>
                  <td className={styles.companyName}>
                    <BuildingOffice2Icon className={styles.companyIcon} />
                    {company.companyName}
                  </td>
                  <td>{company.totalRequestCount}</td>
                  <td className={styles.completed}>
                    {company.completedRequestCount}
                  </td>
                  <td className={styles.pending}>
                    {company.pendingRequestCount}
                  </td>
                  <td className={styles.rating}>
                    <div className={styles.ratingStars}>
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`${styles.star} ${
                            i < Math.round(company.rating)
                              ? styles.starFilled
                              : ""
                          }`}
                        />
                      ))}
                      <span className={styles.ratingValue}>
                        {company.rating > 0 ? company.rating.toFixed(1) : "—"}
                      </span>
                      {company.ratingCount > 0 && (
                        <span className={styles.ratingCount}>
                          ({company.ratingCount})
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Block>
  );
}
