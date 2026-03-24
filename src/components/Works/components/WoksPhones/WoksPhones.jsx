import React from "react";
import styles from "./WoksPhones.module.css";
import Block from "../../../../common/Block/Block";
import { ExclamationTriangleIcon, PhoneIcon } from "@heroicons/react/24/solid";
import { useT } from "../../../../utils/useT";

export default function WorksPhones() {
  const t = useT();

  const phones = [
    { id: 1, name: t("works.phones.112"), phone: "112" },
    { id: 2, name: t("works.phones.101"), phone: "101" },
    { id: 3, name: t("works.phones.102"), phone: "102" },
    { id: 4, name: t("works.phones.103"), phone: "103" },
    { id: 5, name: t("works.phones.104"), phone: "104" },
  ];

  return (
    <div className={styles.phones}>
      <Block>
        <div className={styles.header}>
          <ExclamationTriangleIcon className={styles.icon} />
          {t("works.emergencyServices")}
        </div>
      </Block>
      <div className={styles.phoneList}>
        {phones.map((phone) => {
          return (
            <div className={styles.phoneBlock} key={phone.id}>
              <div className={styles.name}>{phone.name}</div>
              <div className={styles.phone}>
                <PhoneIcon className={styles.phoneIcon} />
                {phone.phone}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
