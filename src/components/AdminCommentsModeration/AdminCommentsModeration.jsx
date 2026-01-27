import React, { useState, useMemo } from "react";
import {
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  XCircleIcon,
  TrashIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";
import { useForm, FormProvider } from "react-hook-form";
import styles from "./AdminCommentsModeration.module.css";
import PageHeader from "../../common/PageHeader/PageHeader";
import InputField from "../../common/InputField/InputField";
import SelectField from "../../common/SelectField/SelectField";
import Block from "../../common/Block/Block";

export default function AdminCommentsModeration() {
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "Иван",
      text: "Очень шумно в подъезде, невозможно отдыхать!",
      status: "pending",
    },
    {
      id: 2,
      author: "Мария",
      text: "Спасибо за быструю уборку двора!",
      status: "approved",
    },
    {
      id: 3,
      author: "Алексей",
      text: "Домофон не работает уже неделю!",
      status: "pending",
    },
    {
      id: 4,
      author: "Ольга",
      text: "Качели во дворе сломаны, опасно для детей.",
      status: "blocked",
    },
  ]);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [searchText, setSearchText] = useState("");
  const [searchStatus, setSearchStatus] = useState("");

  const methods = useForm();

  const handleDeleteComment = (id) => {
    setComments(comments.filter((c) => c.id !== id));
  };

  const handleChangeStatus = (id, newStatus) => {
    setComments(
      comments.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    );
  };

  const statusOptions = [
    { value: "", label: "Все статусы" },
    { value: "pending", label: "Ожидает проверки" },
    { value: "approved", label: "Одобрен" },
    { value: "blocked", label: "Заблокирован" },
  ];

  const renderStatus = (status) => {
    switch (status) {
      case "pending":
        return "Ожидает проверки";
      case "approved":
        return "Одобрен";
      case "blocked":
        return "Заблокирован";
      default:
        return "Неизвестно";
    }
  };

  const filteredAndSortedComments = useMemo(() => {
    let filtered = comments.filter((c) => {
      const matchesText = c.text
        .toLowerCase()
        .includes(searchText.toLowerCase());
      const matchesStatus = searchStatus ? c.status === searchStatus : true;
      return matchesText && matchesStatus;
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
  }, [comments, sortConfig, searchText, searchStatus]);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className={styles.wrapper}>
      <PageHeader
        title="Модерация комментариев"
        icon={ChatBubbleLeftRightIcon}
      />

      <div className={styles.content}>
        <Block>
          <FormProvider {...methods}>
            <div className={styles.searchBlock}>
              <InputField
                name="searchText"
                label="Поиск"
                placeholder="Текст комментария"
                required={false}
                rules={{
                  onChange: (e) => setSearchText(e.target.value),
                }}
              />

              <SelectField
                name="searchStatus"
                label="Статус"
                options={statusOptions}
                required={false}
                onValueChange={(val) => setSearchStatus(val)}
              />
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
                  <th onClick={() => handleSort("author")}>
                    Автор{" "}
                    {sortConfig.key === "author" &&
                      (sortConfig.direction === "asc" ? (
                        <ChevronUpIcon className={styles.sortIcon} />
                      ) : (
                        <ChevronDownIcon className={styles.sortIcon} />
                      ))}
                  </th>
                  <th>Комментарий</th>
                  <th onClick={() => handleSort("status")}>
                    Статус{" "}
                    {sortConfig.key === "status" &&
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
                {filteredAndSortedComments.map((c) => (
                  <tr key={c.id}>
                    <td>{c.id}</td>
                    <td>{c.author}</td>
                    <td>{c.text}</td>
                    <td>{renderStatus(c.status)}</td>
                    <td className={styles.actions}>
                      <button
                        onClick={() => handleChangeStatus(c.id, "approved")}
                        className={styles.approveButton}
                        title="Одобрить"
                      >
                        <CheckCircleIcon className={styles.buttonIcon} />
                      </button>
                      <button
                        onClick={() => handleChangeStatus(c.id, "blocked")}
                        className={styles.blockButton}
                        title="Заблокировать"
                      >
                        <XCircleIcon className={styles.buttonIcon} />
                      </button>
                      <button
                        onClick={() => handleDeleteComment(c.id)}
                        className={styles.deleteButton}
                        title="Удалить"
                      >
                        <TrashIcon className={styles.buttonIcon} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </FormProvider>
        </Block>
      </div>
    </div>
  );
}
