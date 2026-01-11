import React from "react";
import styles from "./AdminDatabase.module.css";
import Block from "../../common/Block/Block";
import {
  BuildingOfficeIcon,
  ClipboardDocumentListIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import PageHeader from "../../common/PageHeader/PageHeader";
import AdminDatabaseUsers from "../AdminDatabaseUsers/AdminDatabaseUsers";

export default function AdminDatabase() {
  const objects = [
    { id: 1, address: "ул. Ленина, д. 10", apartments: 45 },
    { id: 2, address: "пр. Независимости, д. 25", apartments: 120 },
  ];

  const requests = [
    { id: 101, title: "Починка лифта", status: "В обработке" },
    { id: 102, title: "Замена лампочки", status: "Выполнено" },
  ];

  const hmo = [
    { id: 1, name: "ЖЭУ №1", district: "Фрунзенский" },
    { id: 2, name: "ЖЭУ №2", district: "Центральный" },
  ];

  return (
    <div className={styles.wrapper}>
      <PageHeader title="Данные" icon={ClipboardDocumentListIcon} />

      <div className={styles.content}>
        <AdminDatabaseUsers />

        <Block title="Жилые объекты" Icon={BuildingOfficeIcon}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Адрес</th>
                <th>Квартир</th>
              </tr>
            </thead>
            <tbody>
              {objects.map((o) => (
                <tr key={o.id}>
                  <td>{o.id}</td>
                  <td>{o.address}</td>
                  <td>{o.apartments}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Block>

        <Block title="Заявки" Icon={ClipboardDocumentListIcon}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Название</th>
                <th>Статус</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((r) => (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>{r.title}</td>
                  <td>{r.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Block>

        <Block title="Управляющие компании (ЖЭУ)" Icon={Cog6ToothIcon}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Название</th>
                <th>Район</th>
              </tr>
            </thead>
            <tbody>
              {hmo.map((h) => (
                <tr key={h.id}>
                  <td>{h.id}</td>
                  <td>{h.name}</td>
                  <td>{h.district}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Block>
      </div>
    </div>
  );
}
