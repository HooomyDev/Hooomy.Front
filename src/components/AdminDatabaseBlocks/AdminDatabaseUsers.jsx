import React, { useState, useMemo } from "react";
import Block from "../../common/Block/Block";
import {
  UserGroupIcon,
  PencilIcon,
  TrashIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";
import styles from "./AdminDatabaseStyles.module.css";
import { useForm, FormProvider } from "react-hook-form";
import InputField from "../../common/InputField/InputField";
import SelectField from "../../common/SelectField/SelectField";
import Modal from "../../features/modals/Modal/Modal";
import ChangeUserModal from "../../features/modals/ChangeUserModal/ChangeUserModal";
import { PlusIcon } from "@heroicons/react/24/outline";
import CreateNewUserModal from "../../features/modals/CreateNewUserModal/CreateNewUserModal";
import { useQuery } from "@tanstack/react-query";
import { getUserList } from "../../api/services/userService";
import Loader from "../../common/Loader/Loader";

export default function AdminUsers() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isChangeModalOpen, setIsChangeModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [page] = useState(1);
  const [pageSize] = useState(10);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [searchName, setSearchName] = useState("");
  const [searchRole, setSearchRole] = useState("");

  const [visibleCount, setVisibleCount] = useState(5);

  // Запрос пользователей
  const { data: users, isLoading } = useQuery({
    queryKey: ["users", page, pageSize],
    queryFn: () => getUserList(page, pageSize),
    cacheTime: 10 * 60 * 1000,
  });

  const methods = useForm();

  const handleAddUser = () => {};

  const handleDeleteUser = () => {};

  const handleEditUser = () => {};

  const handleSaveEdit = () => {};

  const roleOptions = [
    { value: "", label: "Все роли" },
    { value: "user", label: "Жилец" },
    { value: "employee", label: "Сотрудник ЖЭУ" },
    { value: "admin", label: "Администратор" },
  ];

  const filteredAndSortedUsers = useMemo(() => {
    if (!users) return [];

    let filtered = users.filter((u) => {
      const matchesName =
        u.userName?.toLowerCase().includes(searchName.toLowerCase()) ||
        u.email?.toLowerCase().includes(searchName.toLowerCase());

      const matchesRole = searchRole ? u.role === searchRole : true;

      return matchesName && matchesRole;
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
  }, [users, sortConfig, searchName, searchRole]);

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

          <button
            className={styles.addNewUserButton}
            onClick={() => setIsAddModalOpen(true)}
            title="Добавить пользователя"
          >
            <PlusIcon className={styles.icon} />
          </button>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th onClick={() => handleSort("id")} className={styles.sortable}>
                ID {getSortIcon("id")}
              </th>
              <th
                onClick={() => handleSort("userName")}
                className={styles.sortable}
              >
                Имя пользователя {getSortIcon("userName")}
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
              <th>Email подтвержден</th>
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
                  {u.emailConfirmed ? (
                    <span className={styles.confirmed}>Да</span>
                  ) : (
                    <span className={styles.notConfirmed}>Нет</span>
                  )}
                </td>
                <td className={styles.actions}>
                  <button
                    onClick={() => handleEditUser(u)}
                    className={styles.editButton}
                    title="Редактировать"
                  >
                    <PencilIcon className={styles.actionIcon} />
                  </button>
                  <button
                    onClick={() => handleDeleteUser(u.id)}
                    className={styles.deleteButton}
                    title="Удалить"
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

        <Modal
          isOpen={isChangeModalOpen}
          onClose={() => {
            setIsChangeModalOpen(false);
            setSelectedUser(null);
            methods.reset();
          }}
        >
          <ChangeUserModal
            methods={methods}
            onSave={handleSaveEdit}
            user={selectedUser}
            roleOptions={roleOptions.filter((o) => o.value !== "")}
          />
        </Modal>

        <Modal
          isOpen={isAddModalOpen}
          onClose={() => {
            setIsAddModalOpen(false);
            methods.reset();
          }}
        >
          <CreateNewUserModal
            methods={methods}
            onSave={handleAddUser}
            roleOptions={roleOptions.filter((o) => o.value !== "")}
          />
        </Modal>
      </FormProvider>
    </Block>
  );
}
