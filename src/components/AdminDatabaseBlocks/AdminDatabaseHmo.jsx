import React, { useState, useMemo } from "react";
import Block from "../../common/Block/Block";
import {
  Cog6ToothIcon,
  PencilIcon,
  TrashIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";
import { PlusIcon } from "@heroicons/react/24/outline";
import styles from "./AdminDatabaseStyles.module.css";
import { useForm, FormProvider } from "react-hook-form";
import InputField from "../../common/InputField/InputField";
import Modal from "../../features/modals/Modal/Modal";
import ChangeHmoModal from "../../features/modals/ChangeHmoModal/ChangeHmoModal";
import CreateNewHmoModal from "../../features/modals/CreateNewHmoModal/CreateNewHmoModal";

export default function AdminDatabaseHmo() {
  const [hmo, setHmo] = useState([
    { id: 1, name: "ЖЭУ №1", district: "Фрунзенский" },
    { id: 2, name: "ЖЭУ №2", district: "Центральный" },
    { id: 3, name: "ЖЭУ №3", district: "Советский" },
    { id: 4, name: "ЖЭУ №4", district: "Партизанский" },
    { id: 5, name: "ЖЭУ №5", district: "Первомайский" },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isChangeModalOpen, setIsChangeModalOpen] = useState(false);
  const [selectedHmo, setSelectedHmo] = useState(null);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [searchName, setSearchName] = useState("");
  const [searchDistrict, setSearchDistrict] = useState("");
  const [visibleCount, setVisibleCount] = useState(5);

  const methods = useForm();

  const handleAddHmo = (data) => {
    const id = hmo.length ? hmo[hmo.length - 1].id + 1 : 1;
    setHmo([...hmo, { id, ...data }]);
    setIsAddModalOpen(false);
    methods.reset();
  };

  const handleDeleteHmo = (id) => {
    setHmo(hmo.filter((h) => h.id !== id));
  };

  const handleEditHmo = (company) => {
    setSelectedHmo(company);
    methods.reset(company);
    setIsChangeModalOpen(true);
  };

  const handleSaveEdit = (data) => {
    setHmo(hmo.map((h) => (h.id === selectedHmo.id ? { ...h, ...data } : h)));
    setIsChangeModalOpen(false);
    setSelectedHmo(null);
    methods.reset();
  };

  const filteredAndSortedHmo = useMemo(() => {
    let filtered = hmo.filter((h) => {
      const matchesName = h.name
        .toLowerCase()
        .includes(searchName.toLowerCase());
      const matchesDistrict = searchDistrict
        ? h.district.toLowerCase().includes(searchDistrict.toLowerCase())
        : true;
      return matchesName && matchesDistrict;
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
  }, [hmo, sortConfig, searchName, searchDistrict]);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return (
    <Block title="Управляющие компании (ЖЭУ)" Icon={Cog6ToothIcon}>
      <FormProvider {...methods}>
        <div className={styles.searchBlock}>
          <div className={styles.searchField}>
            <InputField
              name="searchName"
              label="Поиск по названию"
              placeholder="Название ЖЭУ"
              required={false}
              rules={{
                onChange: (e) => setSearchName(e.target.value),
              }}
            />
          </div>

          <div className={styles.searchField}>
            <InputField
              name="searchDistrict"
              label="Поиск по району"
              placeholder="Район"
              required={false}
              rules={{
                onChange: (e) => setSearchDistrict(e.target.value),
              }}
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
                Название{" "}
                {sortConfig.key === "name" &&
                  (sortConfig.direction === "asc" ? (
                    <ChevronUpIcon className={styles.sortIcon} />
                  ) : (
                    <ChevronDownIcon className={styles.sortIcon} />
                  ))}
              </th>
              <th onClick={() => handleSort("district")}>
                Район{" "}
                {sortConfig.key === "district" &&
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
            {filteredAndSortedHmo.slice(0, visibleCount).map((h) => (
              <tr key={h.id}>
                <td>{h.id}</td>
                <td>{h.name}</td>
                <td>{h.district}</td>
                <td className={styles.actions}>
                  <button
                    onClick={() => handleEditHmo(h)}
                    className={styles.editButton}
                  >
                    <PencilIcon className={styles.actionIcon} />
                  </button>
                  <button
                    onClick={() => handleDeleteHmo(h.id)}
                    className={styles.deleteButton}
                  >
                    <TrashIcon className={styles.actionIcon} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {visibleCount < filteredAndSortedHmo.length && (
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
          <ChangeHmoModal methods={methods} onSave={handleSaveEdit} />
        </Modal>

        <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
          <CreateNewHmoModal methods={methods} onSave={handleAddHmo} />
        </Modal>
      </FormProvider>
    </Block>
  );
}
