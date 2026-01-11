import React, { useState, useMemo } from "react";
import Block from "../../common/Block/Block";
import {
  UserGroupIcon,
  PencilIcon,
  TrashIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";
import styles from "../AdminDatabase/AdminDatabase.module.css";
import { useForm, FormProvider } from "react-hook-form";
import InputField from "../../common/InputField/InputField";
import SelectField from "../../common/SelectField/SelectField";
import Modal from "../../features/modals/Modal/Modal";
import ChangeUserModal from "../../features/modals/ChangeUserModal/ChangeUserModal";
import { PlusIcon } from "@heroicons/react/24/outline";
import CreateNewUserModal from "../../features/modals/CreateNewUserModal/CreateNewUserModal";

export default function AdminUsers() {
  const [users, setUsers] = useState([
    { id: 1, name: "Иван Иванов", role: "user", email: "ivan@example.com" },
    { id: 2, name: "Петр Петров", role: "employee", email: "petr@example.com" },
    {
      id: 3,
      name: "Сергей Сергеев",
      role: "admin",
      email: "sergey@example.com",
    },
    { id: 4, name: "Анна Смирнова", role: "user", email: "anna@example.com" },
    {
      id: 5,
      name: "Мария Кузнецова",
      role: "employee",
      email: "maria@example.com",
    },
    {
      id: 6,
      name: "Алексей Попов",
      role: "admin",
      email: "alexey@example.com",
    },
    {
      id: 7,
      name: "Екатерина Васильева",
      role: "user",
      email: "ekaterina@example.com",
    },
    {
      id: 8,
      name: "Дмитрий Соколов",
      role: "employee",
      email: "dmitry@example.com",
    },
    { id: 9, name: "Ольга Михайлова", role: "user", email: "olga@example.com" },
    {
      id: 10,
      name: "Николай Новиков",
      role: "admin",
      email: "nikolay@example.com",
    },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isChangeModalOpen, setIsChangeModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [searchName, setSearchName] = useState("");
  const [searchRole, setSearchRole] = useState("");

  const [visibleCount, setVisibleCount] = useState(5);

  const methods = useForm();

  const handleAddUser = (data) => {
    const id = users.length ? users[users.length - 1].id + 1 : 1;
    setUsers([...users, { id, ...data }]);
    setIsAddModalOpen(false);
    methods.reset();
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    methods.reset(user);
    setIsChangeModalOpen(true);
  };

  const handleSaveEdit = (data) => {
    setUsers(
      users.map((u) => (u.id === selectedUser.id ? { ...u, ...data } : u))
    );
    setIsChangeModalOpen(false);
    setSelectedUser(null);
    methods.reset();
  };

  const roleOptions = [
    { value: "", label: "Все роли" },
    { value: "user", label: "Жилец" },
    { value: "employee", label: "Сотрудник ЖЭУ" },
    { value: "admin", label: "Администратор" },
  ];

  const filteredAndSortedUsers = useMemo(() => {
    let filtered = users.filter((u) => {
      const matchesName = u.name
        .toLowerCase()
        .includes(searchName.toLowerCase());
      const matchesRole = searchRole ? u.role === searchRole : true;
      return matchesName && matchesRole;
    });

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        const valA = a[sortConfig.key];
        const valB = b[sortConfig.key];
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
    switch (role) {
      case "user":
        return "Жилец";
      case "employee":
        return "Сотрудник ЖЭУ";
      case "admin":
        return "Администратор";
      default:
        return "Неизвестно";
    }
  };

  return (
    <Block title="Пользователи" Icon={UserGroupIcon}>
      <FormProvider {...methods}>
        <div className={styles.searchBlock}>
          <div className={styles.searchField}>
            <InputField
              name="searchName"
              label="Поиск"
              placeholder="Имя / фамилия / отчество"
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

          <div
            className={styles.addNewUserButton}
            onClick={() => setIsAddModalOpen(true)}
          >
            <PlusIcon className={styles.icon} />
          </div>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th onClick={() => handleSort("id")}>
                ID{" "}
                {sortConfig.key === "id" &&
                  (sortConfig.direction === "asc" ? (
                    <ChevronUpIcon className={styles.sortIcon} />
                  ) : (
                    <ChevronDownIcon className={styles.sortIcon} />
                  ))}
              </th>
              <th onClick={() => handleSort("name")}>
                Имя{" "}
                {sortConfig.key === "name" &&
                  (sortConfig.direction === "asc" ? (
                    <ChevronUpIcon className={styles.sortIcon} />
                  ) : (
                    <ChevronDownIcon className={styles.sortIcon} />
                  ))}
              </th>
              <th onClick={() => handleSort("role")}>
                Роль{" "}
                {sortConfig.key === "role" &&
                  (sortConfig.direction === "asc" ? (
                    <ChevronUpIcon className={styles.sortIcon} />
                  ) : (
                    <ChevronDownIcon className={styles.sortIcon} />
                  ))}
              </th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedUsers.slice(0, visibleCount).map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{renderRole(u.role)}</td>
                <td className={styles.actions}>
                  <button
                    onClick={() => handleEditUser(u)}
                    className={styles.editButton}
                  >
                    <PencilIcon className={styles.actionIcon} />
                  </button>
                  <button
                    onClick={() => handleDeleteUser(u.id)}
                    className={styles.deleteButton}
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
            {" "}
            <button
              onClick={() => setVisibleCount((prev) => prev + 5)}
              className={styles.showMoreButton}
            >
              {" "}
              Показать больше{" "}
            </button>{" "}
          </div>
        )}

        <Modal
          isOpen={isChangeModalOpen}
          onClose={() => setIsChangeModalOpen(false)}
        >
          <ChangeUserModal
            methods={methods}
            onSave={handleSaveEdit}
            roleOptions={[
              { value: "user", label: "Жилец" },
              { value: "employee", label: "Сотрудник ЖЭУ" },
              { value: "admin", label: "Администратор" },
            ]}
          />
        </Modal>

        <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
          <CreateNewUserModal
            methods={methods}
            onSave={handleAddUser}
            roleOptions={[
              { value: "user", label: "Жилец" },
              { value: "employee", label: "Сотрудник ЖЭУ" },
              { value: "admin", label: "Администратор" },
            ]}
          />
        </Modal>
      </FormProvider>
    </Block>
  );
}
