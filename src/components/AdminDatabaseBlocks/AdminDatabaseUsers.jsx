import React, { useState, useMemo } from "react";
import Block from "../../common/Block/Block";
import {
  UserGroupIcon,
  TrashIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  CheckCircleIcon,
  NoSymbolIcon,
} from "@heroicons/react/24/solid";
import styles from "./AdminDatabaseUsers.module.css";
import { useForm, FormProvider } from "react-hook-form";
import InputField from "../../common/InputField/InputField";
import SelectField from "../../common/SelectField/SelectField";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUserList, changeUserStatus } from "../../api/services/userService";
import Loader from "../../common/Loader/Loader";
import PageHeader from "../../common/PageHeader/PageHeader";

export default function AdminDatabaseUsers() {
  const [page] = useState(1);
  const [pageSize] = useState(10);

  const queryClient = useQueryClient();

  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [searchName, setSearchName] = useState("");
  const [searchRole, setSearchRole] = useState("");
  const [searchStatus, setSearchStatus] = useState("");

  const [visibleCount, setVisibleCount] = useState(5);

  // Запрос пользователей
  const { data: users, isLoading } = useQuery({
    queryKey: ["users", page, pageSize],
    queryFn: () => getUserList(page, pageSize),
    cacheTime: 10 * 60 * 1000,
  });

  const methods = useForm();

  const statusMutation = useMutation({
    mutationFn: ({ id, status }) => changeUserStatus(id, status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  const handleDeleteUser = (id) =>
    statusMutation.mutate({ id, status: "Deleted" });

  const handleApproveUser = (id) =>
    statusMutation.mutate({ id, status: "Approved" });

  const handleBanUser = (id) => statusMutation.mutate({ id, status: "Banned" });

  const renderStatus = (status) => {
    switch (status) {
      case "Approved":
        return "Одобрен";
      case "Pending":
        return "Ожидает подтверждения";
      case "Banned":
        return "Заблокирован";
      case "Deleted":
        return "Удалён";
      default:
        return status || "Неизвестно";
    }
  };

  const statusOptions = [
    { value: "", label: "Все статусы" },
    { value: "Pending", label: "Ожидает подтверждения" },
    { value: "Approved", label: "Одобрен" },
  ];

  const roleOptions = [
    { value: "", label: "Все роли" },
    { value: "Resident", label: "Жилец" },
    { value: "Employee", label: "Сотрудник ЖЭУ" },
    { value: "Admin", label: "Администратор" },
  ];

  const filteredAndSortedUsers = useMemo(() => {
    if (!users) return [];

    let filtered = users.filter((u) => {
      const matchesName =
        u.userName?.toLowerCase().includes(searchName.toLowerCase()) ||
        u.email?.toLowerCase().includes(searchName.toLowerCase());

      const matchesRole = searchRole ? u.role === searchRole : true;
      const matchesStatus = searchStatus ? u.status === searchStatus : true;

      return matchesName && matchesRole && matchesStatus;
    });

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let valA = a[sortConfig.key];
        let valB = b[sortConfig.key];

        // Приводим к нижнему регистру для строк
        if (typeof valA === "string") valA = valA.toLowerCase();
        if (typeof valB === "string") valB = valB.toLowerCase();

        if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
        if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [users, sortConfig, searchName, searchRole, searchStatus]);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const renderRole = (role) => {
    console.log(role);
    switch (role) {
      case "Resident":
        return "Жилец";
      case "Employee":
        return "Сотрудник ЖЭУ";
      case "Admin":
        return "Администратор";
      default:
        return "Неизвестно";
    }
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? (
      <ChevronUpIcon className={styles.sortIcon} />
    ) : (
      <ChevronDownIcon className={styles.sortIcon} />
    );
  };

  if (isLoading) return <Loader />;

  return (
    <div className={styles.wrapper}>
      <PageHeader icon={UserGroupIcon} title="Пользователи" />
      <Block title="Пользователи" Icon={UserGroupIcon}>
        <FormProvider {...methods}>
          <div className={styles.searchBlock}>
            <div className={styles.searchField}>
              <InputField
                name="searchName"
                label="Поиск"
                placeholder="Имя / Email"
                required={false}
                rules={{
                  onChange: (e) => setSearchName(e.target.value),
                }}
              />
            </div>

            <div className={styles.roleField}>
              <SelectField
                name="searchRole"
                label="Роль"
                options={roleOptions}
                required={false}
                onValueChange={(val) => setSearchRole(val)}
              />
            </div>

            <div className={styles.roleField}>
              <SelectField
                name="searchStatus"
                label="Статус"
                options={statusOptions}
                required={false}
                onValueChange={(val) => setSearchStatus(val)}
              />
            </div>
          </div>

          <table className={styles.table}>
            <thead>
              <tr>
                <th
                  onClick={() => handleSort("id")}
                  className={styles.sortable}
                >
                  ID {getSortIcon("id")}
                </th>
                <th
                  onClick={() => handleSort("userName")}
                  className={styles.sortable}
                >
                  ФИО {getSortIcon("userName")}
                </th>
                <th
                  onClick={() => handleSort("email")}
                  className={styles.sortable}
                >
                  Email {getSortIcon("email")}
                </th>
                <th
                  onClick={() => handleSort("role")}
                  className={styles.sortable}
                >
                  Роль {getSortIcon("role")}
                </th>
                <th>Номер телефона</th>
                <th>Статус</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedUsers.slice(0, visibleCount).map((u) => (
                <tr key={u.id}>
                  <td>{u.id.slice(0, 8) + "..."}</td>
                  <td>
                    {u.firstName +
                      " " +
                      u.surname +
                      (u.patronymic ? " " + u.patronymic : "")}
                  </td>
                  <td>{u.email}</td>
                  <td>{renderRole(u.roles[0])}</td>
                  <td>{u.phoneNumber ? u.phoneNumber : "Не указан"}</td>
                  <td>
                    {u.status && (
                      <span className={styles.confirmed}>
                        {renderStatus(u.status)}
                      </span>
                    )}
                  </td>
                  <td className={styles.actions}>
                    <button
                      onClick={() => handleApproveUser(u.id)}
                      className={styles.approveButton}
                      title="Одобрить"
                      disabled={u.status === "Approved"}
                    >
                      <CheckCircleIcon className={styles.actionIcon} />
                    </button>
                    <button
                      onClick={() => handleBanUser(u.id)}
                      className={styles.banButton}
                      title="Заблокировать"
                      disabled={u.status === "Banned"}
                    >
                      <NoSymbolIcon className={styles.actionIcon} />
                    </button>
                    <button
                      onClick={() => handleDeleteUser(u.id)}
                      className={styles.deleteButton}
                      title="Удалить"
                      disabled={u.status === "Deleted"}
                    >
                      <TrashIcon className={styles.actionIcon} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {visibleCount < filteredAndSortedUsers.length && (
            <div className={styles.showMoreWrapper}>
              <button
                onClick={() => setVisibleCount((prev) => prev + 5)}
                className={styles.showMoreButton}
              >
                Показать еще 5
              </button>
            </div>
          )}

          {filteredAndSortedUsers.length === 0 && (
            <div className={styles.noData}>
              <p>Пользователи не найдены</p>
            </div>
          )}
        </FormProvider>
      </Block>
    </div>
  );
}
