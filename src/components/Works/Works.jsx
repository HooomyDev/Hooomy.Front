import React from "react";
import Block from "../../common/Block/Block";
import {
  Cog6ToothIcon,
  WrenchScrewdriverIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";
import { useT } from "../../utils/useT";
import styles from "./Works.module.css";
import Loader from "../../common/Loader/Loader";
import PageHeader from "../../common/PageHeader/PageHeader";
import { getWorks } from "../../api/services/workService";
import WorksPhones from "./components/WoksPhones/WoksPhones";
import { formatDate } from "date-fns";
import { ru } from "date-fns/locale";
import { useQuery } from "@tanstack/react-query";

export default function Works() {
  const t = useT();

  const { data: works, isLoading } = useQuery({
    queryKey: ["works"],
    queryFn: getWorks,
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={styles.wrapper}>
      <PageHeader title={t("works.title")} icon={Cog6ToothIcon} />

      <div className={styles.content}>
        <Block title={t("works.byAddress")} Icon={WrenchScrewdriverIcon}>
          <div className={styles.worksList}>
            {works.length === 0 ? (
              <div className={styles.empty}>
                <WrenchScrewdriverIcon className={styles.icon} />
                Нет активных работ
              </div>
            ) : (
              works.map((work) => (
                <div
                  className={`${styles.workWrapper} ${
                    styles[work.seriousness]
                  }`}
                  key={work.id}
                >
                  <div className={styles.workIconWrapper}>
                    {work.seriousness === 1 ? (
                      <InformationCircleIcon
                        className={`${styles.workIcon} ${styles.infoIcon}`}
                      />
                    ) : (
                      <ExclamationTriangleIcon
                        className={`${styles.workIcon} ${styles.warnIcon}`}
                      />
                    )}
                  </div>
                  <div className={styles.work}>
                    <div className={styles.title}>{work.title}</div>
                    <div className={styles.address}>
                      {t("works.address")}: {work.street + ", " + work.house}
                    </div>
                    <div className={styles.periods}>
                      <div>
                        {t("works.plannedPeriod")}:{" "}
                        {formatDate(
                          new Date(work.plannedStartTime),
                          "dd.MM.yyyy HH:mm",
                          { locale: ru }
                        )}{" "}
                        -{" "}
                        {formatDate(
                          new Date(work.plannedEndTime),
                          "dd.MM.yyyy HH:mm",
                          { locale: ru }
                        )}
                      </div>

                      {work.factStartTime && (
                        <div>
                          {t("works.actualPeriod")}:{" "}
                          {formatDate(
                            new Date(work.factStartTime),
                            "dd.MM.yyyy HH:mm",
                            { locale: ru }
                          )}{" "}
                          -{" "}
                          {work.factEndTime
                            ? formatDate(
                                new Date(work.factEndTime),
                                "dd.MM.yyyy HH:mm",
                                { locale: ru }
                              )
                            : t("works.inProgress")}
                        </div>
                      )}

                      <div>
                        {t("works.description")}: {work.description}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </Block>
        <WorksPhones />
      </div>
    </div>
  );
}
