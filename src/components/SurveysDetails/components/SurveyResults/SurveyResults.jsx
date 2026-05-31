import React from "react";
import styles from "./SurveyResults.module.css";
import Block from "../../../../common/Block/Block";
import { UserGroupIcon } from "@heroicons/react/24/solid";
import { useT } from "../../../../utils/useT";

export default function SurveyResults({ survey }) {
  const t = useT();
  return (
    <Block
      Icon={UserGroupIcon}
      title={`${t("surveys.results")} (${t("surveys.allVotes")}: ${survey?.voteCount})`}
    >
      <div className={styles.stats}>
        {survey?.options.map((option) => {
          const percent =
            survey?.voteCount > 0
              ? (option.voteCount / survey?.voteCount) * 100
              : 0;

          return (
            <div key={option.id} className={styles.statItem}>
              <div className={styles.statLabel}>
                <span>
                  {option.content}{" "}
                  {survey.userVotes.includes(option.id) &&
                    `(${t("surveys.your")})`}
                </span>
                <span>
                  {option.voteCount} ({percent.toFixed(1)}%)
                </span>
              </div>
              <div className={styles.progress}>
                <div
                  className={styles.progressFill}
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Block>
  );
}
