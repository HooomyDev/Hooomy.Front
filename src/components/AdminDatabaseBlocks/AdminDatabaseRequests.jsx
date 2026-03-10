import React, { useState, useMemo } from "react";
import Block from "../../common/Block/Block";
import {
  ClipboardDocumentListIcon,
  PencilIcon,
  TrashIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";
import { PlusIcon } from "@heroicons/react/24/outline";
import styles from "./AdminDatabaseStyles.module.css";
import { useForm, FormProvider } from "react-hook-form";
import InputField from "../../common/InputField/InputField";
import SelectField from "../../common/SelectField/SelectField";
import Modal from "../../features/modals/Modal/Modal";
import ChangeRequestModal from "../../features/modals/ChangeRequestModal/ChangeRequestModal";
import CreateNewRequestModal from "../../features/modals/CreateNewRequestModal/CreateNewRequestModal";

export default function AdminDatabaseRequests() {
  const [requests, setRequests] = useState([
    { id: 1, title: "Заявка на ремонт лифта", status: "open" },
    { id: 2, title: "Заявка на уборку подъезда", status: "in_progress" },
    { id: 3, title: "Заявка на замену лампочки", status: "done" },
    { id: 4, title: "Заявка на ремонт крыши", status: "open" },
    { id: 5, title: "Заявка на покраску стен", status: "in_progress" },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isChangeModalOpen, setIsChangeModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [searchTitle, setSearchTitle] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const [visibleCount, setVisibleCount] = useState(5);

  const methods = useForm();

  const handleAddRequest = (data) => {
    const id = requests.length ? requests[requests.length - 1].id + 1 : 1;
    setRequests([...requests, { id, ...data }]);
    setIsAddModalOpen(false);
    methods.reset();
  };

  const handleDeleteRequest = (id) => {
    setRequests(requests.filter((r) => r.id !== id));
  };

  const handleEditRequest = (request) => {
    setSelectedRequest(request);
    methods.reset(request);
    setIsChangeModalOpen(true);
  };

  const handleSaveEdit = (data) => {
    setRequests(
      requests.map((r) => (r.id === selectedRequest.id ? { ...r, ...data } : r))
    );
    setIsChangeModalOpen(false);
    setSelectedRequest(null);
    methods.reset();
  };

  const statusOptions = [
    { value: "", label: "Все статусы" },
    { value: "open", label: "Открыта" },
    { value: "in_progress", label: "В работе" },
    { value: "done", label: "Завершена" },
  ];

  const renderStatus = (status) => {
    switch (status) {
      case "open":
        return "Открыта";
      case "in_progress":
        return "В работе";
      case "done":
        return "Завершена";
      default:
        return "Неизвестно";
    }
  };

  const filteredAndSortedRequests = useMemo(() => {
    let filtered = requests.filter((r) => {
      const matchesTitle = r.title
        .toLowerCase()
        .includes(searchTitle.toLowerCase());
      const matchesStatus = searchStatus ? r.status === searchStatus : true;
      return matchesTitle && matchesStatus;
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
  }, [requests, sortConfig, searchTitle, searchStatus]);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return (
    <Block title="Заявки" Icon={ClipboardDocumentListIcon}>
      <FormProvider {...methods}>
        <div className={styles.searchBlock}>
          <div className={styles.searchField}>
            <InputField
              name="searchTitle"
              label="Поиск"
              placeholder="Название заявки"
              required={false}
              rules={{
                onChange: (e) => setSearchTitle(e.target.value),
              }}
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
              <th onClick={() => handleSort("title")}>
                Название{" "}
                {sortConfig.key === "title" &&
                  (sortConfig.direction === "asc" ? (
                    <ChevronUpIcon className={styles.sortIcon} />
                  ) : (
                    <ChevronDownIcon className={styles.sortIcon} />
                  ))}
              </th>
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
            {filteredAndSortedRequests.slice(0, visibleCount).map((r) => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.title}</td>
                <td>{renderStatus(r.status)}</td>
                <td className={styles.actions}>
                  <button
                    onClick={() => handleEditRequest(r)}
                    className={styles.editButton}
                  >
                    <PencilIcon className={styles.actionIcon} />
                  </button>
                  <button
                    onClick={() => handleDeleteRequest(r.id)}
                    className={styles.deleteButton}
                  >
                    <TrashIcon className={styles.actionIcon} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {visibleCount < filteredAndSortedRequests.length && (
          <div className={styles.showMoreWrapper}>
            <button
              onClick={() => setVisibleCount((prev) => prev + 5)}
              className={styles.showMoreButton}
            >
              Показать больше
            </button>
          </div>
        )}

        <Modal
          isOpen={isChangeModalOpen}
          onClose={() => setIsChangeModalOpen(false)}
        >
          <ChangeRequestModal methods={methods} onSave={handleSaveEdit} />
        </Modal>

        <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
          <CreateNewRequestModal methods={methods} onSave={handleAddRequest} />
        </Modal>
      </FormProvider>
    </Block>
  );
}
