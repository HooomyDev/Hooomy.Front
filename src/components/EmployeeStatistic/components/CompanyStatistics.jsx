import React from "react";
import styles from "./CompanyStatistics.module.css";
import Block from "../../../common/Block/Block";
import { BuildingOffice2Icon, StarIcon } from "@heroicons/react/24/solid";
import { useT } from "../../../utils/useT";

export default function CompanyStatistics({ companies = [] }) {
  const t = useT();
  return (
    <Block Icon={BuildingOffice2Icon} title={t("companyStatistics.header")}>
      <div className={styles.statsContainer}>
        {/* Сводная статистика */}
        <div className={styles.summaryCards}>
          <div className={styles.summaryCard}>
            <div className={styles.summaryValue}>{companies.length}</div>
            <div className={styles.summaryLabel}>
              {t("companyStatistics.totalCompanies")}
            </div>
          </div>
          <div className={styles.summaryCard}>
            <div className={styles.summaryValue}>
              {companies.reduce((sum, c) => sum + c.totalRequestCount, 0)}
            </div>
            <div className={styles.summaryLabel}>
              {t("companyStatistics.totalRequests")}
            </div>
          </div>
          <div className={styles.summaryCard}>
            <div className={styles.summaryValue}>
              {companies.filter((c) => c.rating > 0).length}
            </div>
            <div className={styles.summaryLabel}>
              {t("companyStatistics.withRatings")}
            </div>
          </div>
        </div>

        {/* Таблица компаний */}
        <div className={styles.tableWrapper}>
          <table className={styles.statsTable}>
            <thead>
              <tr>
                <th>{t("companyStatistics.table.company")}</th>
                <th>{t("companyStatistics.table.requests")}</th>
                <th>{t("companyStatistics.table.completed")}</th>
                <th>{t("companyStatistics.table.pending")}</th>
                <th>{t("companyStatistics.table.rating")}</th>
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
