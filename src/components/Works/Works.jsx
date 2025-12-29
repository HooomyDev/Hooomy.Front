import React, { useEffect, useState } from "react";
import Block from "../../common/Block/Block";
import {
  Cog6ToothIcon,
  WrenchScrewdriverIcon,
  ExclamationTriangleIcon,
  PhoneIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";
import { useT } from "../../utils/useT";
import styles from "./Works.module.css";
import Loader from "../../common/Loader/Loader";

export default function Works() {
  const t = useT();

  const [loading, setLoading] = useState(true);
  const [works, setWorks] = useState([]);

  useEffect(() => {
    async function fetchRequests() {
      try {
        setLoading(true);

        // имитация загрузки
        //await new Promise((resolve) => setTimeout(resolve, 2000));

        // TODO: подключить реальные данные
        const data = [
          {
            id: 1,
            seriousness: "info",
            title: "Database migration",
            plannedPeriod: {
              start: "22-12-2025 08:00",
              end: "30-12-2025 09:00",
            },
            actualPeriod: {
              start: "22-12-2025 08:01",
              end: "23-12-2025 08:25",
            },
            description: "Description",
            address: "adressssssssssssssssss",
          },
          {
            id: 2,
            seriousness: "warn",
            title: "Server maintenance",
            plannedPeriod: {
              start: "24-12-2025 10:00",
              end: "24-12-2025 14:00",
            },
            actualPeriod: {
              start: "24-12-2025 10:15",
              end: "24-12-2025 13:45",
            },
            description: "Description",
            address: "adressssssssssssssssss",
          },
          {
            id: 3,
            seriousness: "warn",
            title: "Security patch deployment",
            plannedPeriod: {
              start: "26-12-2025 20:00",
              end: "27-12-2025 02:00",
            },
            actualPeriod: {
              start: "26-12-2025 20:30",
              end: "27-12-2025 01:50",
            },
            description: "Description",
            address: "adressssssssssssssssss",
          },
          {
            id: 4,
            seriousness: "info",
            title: "UI update rollout",
            plannedPeriod: {
              start: "28-12-2025 09:00",
              end: "28-12-2025 11:00",
            },
            actualPeriod: {
              start: "28-12-2025 09:10",
              end: "28-12-2025 11:05",
            },
            description: "Description",
            address: "adressssssssssssssssss",
          },
        ];

        setWorks(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchRequests();
  }, [t]);

  const phones = [
    { id: 1, name: t("works.phones.112"), phone: "112" },
    { id: 2, name: t("works.phones.101"), phone: "101" },
    { id: 3, name: t("works.phones.102"), phone: "102" },
    { id: 4, name: t("works.phones.103"), phone: "103" },
    { id: 5, name: t("works.phones.104"), phone: "104" },
  ];

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.wrapper}>
      <Block>
        <div className={styles.container}>
          <Cog6ToothIcon className={styles.icon} />
          <div className={styles.title}>{t("works.title")}</div>
        </div>
      </Block>
      <div className={styles.content}>
        <Block title={t("works.byAddress")} Icon={WrenchScrewdriverIcon}>
          <div className={styles.worksList}>
            {works.map((work) => (
              <div
                className={`${styles.workWrapper} ${styles[work.seriousness]}`}
                key={work.id}
              >
                <div className={styles.workIconWrapper}>
                  {work.seriousness === "info" ? (
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
                    {t("works.address")}: {work.address}
                  </div>
                  <div className={styles.periods}>
                    <div>
                      {t("works.plannedPeriod")}: {work.plannedPeriod.start} -{" "}
                      {work.plannedPeriod.end}
                    </div>
                    <div>
                      {t("works.actualPeriod")}: {work.actualPeriod.start} -{" "}
                      {work.actualPeriod.end}
                    </div>
                    <div>
                      {t("works.description")}: {work.description}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Block>
        <div className={styles.phones}>
          <Block
            title={t("works.emergencyServices")}
            Icon={ExclamationTriangleIcon}
          >
            <div className={styles.phoneList}>
              {phones.map((phone) => {
                return (
                  <div className={styles.phoneBlock} key={phone.id}>
                    <div className={styles.name}>- {phone.name}</div>
                    <div className={styles.phone}>
                      <PhoneIcon className={styles.phoneIcon} /> {phone.phone}
                    </div>
                  </div>
                );
              })}
            </div>
          </Block>
        </div>
      </div>
    </div>
  );
}
