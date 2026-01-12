import React from "react";
import styles from "./AdminDatabase.module.css";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/solid";
import PageHeader from "../../common/PageHeader/PageHeader";
import AdminDatabaseUsers from "../AdminDatabaseBlocks/AdminDatabaseUsers";
import AdminDatabaseResedentialObjects from "../AdminDatabaseBlocks/AdminDatabaseResedentialObjects";
import AdminDatabaseRequests from "../AdminDatabaseBlocks/AdminDatabaseRequests";
import AdminDatabaseHmo from "../AdminDatabaseBlocks/AdminDatabaseHmo";

export default function AdminDatabase() {
  return (
    <div className={styles.wrapper}>
      <PageHeader title="Данные" icon={ClipboardDocumentListIcon} />

      <div className={styles.content}>
        <AdminDatabaseUsers />
        <AdminDatabaseResedentialObjects />
        <AdminDatabaseRequests />
        <AdminDatabaseHmo />
      </div>
    </div>
  );
}
