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
import PageHeader from "../../common/PageHeader/PageHeader";
import { getWorks } from "../../api/services/workService";

export default function Works() {
  const t = useT();

  const [loading, setLoading] = useState(true);
  const [works, setWorks] = useState([]);

  useEffect(() => {
    async function fetchRequests() {
      try {
        setLoading(true);

        const data = await getWorks();

        // const data = [
        //   {
        //     id: 1,
        //     seriousness: "info",
        //     title: "Database migration",
        //     plannedPeriod: {
        //       start: "22-12-2025 08:00",
        //       end: "30-12-2025 09:00",
        //     },
        //     actualPeriod: {
        //       start: "22-12-2025 08:01",
        //       end: "23-12-2025 08:25",
        //     },
        //     description: "Description",
        //     address: "adressssssssssssssssss",
        //   },
        // ];

        setWorks(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchRequests();
  }, []);

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
      <PageHeader title={t("works.title")} icon={Cog6ToothIcon} />

      <div className={styles.content}>
        <Block title={t("works.byAddress")} Icon={WrenchScrewdriverIcon}>
          <div className={styles.worksList}>
            {works.map((work) => (
              <div
                className={`${styles.workWrapper} ${styles[work.seriousness]}`}
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
                      {t("works.plannedPeriod")}: {work.plannedStartTime} -{" "}
                      {work.plannedEndTime}
                    </div>
                    {work.factStartTime && (
                      <div>
                        {t("works.actualPeriod")}: {work.factStartTime} -{" "}
                        {work.factEndTime}
                      </div>
                    )}

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
