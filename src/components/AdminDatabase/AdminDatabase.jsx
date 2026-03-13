import React, { useState } from "react";
import styles from "./AdminDatabase.module.css";
import {
  ClipboardDocumentListIcon,
  HomeIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/solid";
import PageHeader from "../../common/PageHeader/PageHeader";
import AdminDatabaseUsers from "../AdminDatabaseBlocks/AdminDatabaseUsers";
import AdminDatabaseResedentialObjects from "../AdminDatabaseBlocks/AdminDatabaseResedentialObjects";
import AdminDatabaseRequests from "../AdminDatabaseBlocks/AdminDatabaseRequests";
import AdminDatabaseHmo from "../AdminDatabaseBlocks/AdminDatabaseHmo";
import Button from "../../common/Button/Button";
import { ReactComponent as UserLogo } from "../../assets/user.svg";

export default function AdminDatabase() {
  const [table, setTable] = useState(null);

  const tables = [
    {
      id: 0,
      component: <AdminDatabaseUsers />,
      name: "Пользователи",
      icon: <UserLogo />,
    },
    {
      id: 1,
      component: <AdminDatabaseResedentialObjects />,
      name: "Улицы",
      icon: <HomeIcon />,
    },
    {
      id: 2,
      component: <AdminDatabaseRequests />,
      name: "Заявки",
      icon: <ClipboardDocumentListIcon />,
    },
    {
      id: 3,
      component: <AdminDatabaseHmo />,
      name: "УК",
      icon: <WrenchScrewdriverIcon />,
    },
  ];

  const handleSelectTable = (tableId) => {
    setTable(tables[tableId].component);
  };

  return (
    <div className={styles.wrapper}>
      <PageHeader title="Данные" icon={ClipboardDocumentListIcon} />

      <div className={styles.content}>
        <div className={styles.tableSelector}>
          {tables.map((tbl) => {
            return (
              <Button
                key={tbl.id}
                className={styles.tableSelectorButton}
                variant={table?.id === tbl.id ? "primary" : "secondary"}
                onClick={() => handleSelectTable(tbl.id)}
                title={tbl.name}
              >
                {tbl.icon}
              </Button>
            );
          })}
        </div>

        {table ? (
          table
        ) : (
          <div className={styles.selectTableBlock}>
            Пожалуйста выберите таблицу для просмотра
          </div>
        )}
      </div>
    </div>
  );
}
