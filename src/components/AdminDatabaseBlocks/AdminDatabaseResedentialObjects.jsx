import React, { useState, useMemo } from "react";
import Block from "../../common/Block/Block";
import {
  BuildingOfficeIcon,
  PencilIcon,
  TrashIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";
import { PlusIcon } from "@heroicons/react/24/outline";
import styles from "./AdminDatabaseAddresses.module.css";
import { useForm, FormProvider } from "react-hook-form";
import InputField from "../../common/InputField/InputField";
import Modal from "../../features/modals/Modal/Modal";
import ChangeObjectModal from "../../features/modals/ChangeObjectModal/ChangeObjectModal";
import CreateNewObjectModal from "../../features/modals/CreateNewObjectModal/CreateNewObjectModal";
import PageHeader from "../../common/PageHeader/PageHeader";

export default function AdminDatabaseResidentialObjects() {
  const [objects, setObjects] = useState([
    { id: 1, address: "ул. Ленина, д. 10", apartments: 45 },
    { id: 2, address: "пр. Независимости, д. 25", apartments: 120 },
    { id: 3, address: "ул. Победы, д. 7", apartments: 60 },
    { id: 4, address: "ул. Октябрьская, д. 15", apartments: 80 },
    { id: 5, address: "ул. Советская, д. 3", apartments: 30 },
    { id: 6, address: "ул. Партизанская, д. 20", apartments: 100 },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isChangeModalOpen, setIsChangeModalOpen] = useState(false);
  const [selectedObject, setSelectedObject] = useState(null);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [searchAddress, setSearchAddress] = useState("");
  const [visibleCount, setVisibleCount] = useState(5);

  const methods = useForm();

  const handleAddObject = (data) => {
    const id = objects.length ? objects[objects.length - 1].id + 1 : 1;
    setObjects([...objects, { id, ...data }]);
    setIsAddModalOpen(false);
    methods.reset();
  };

  const handleDeleteObject = (id) => {
    setObjects(objects.filter((o) => o.id !== id));
  };

  const handleEditObject = (object) => {
    setSelectedObject(object);
    methods.reset(object);
    setIsChangeModalOpen(true);
  };

  const handleSaveEdit = (data) => {
    setObjects(
      objects.map((o) => (o.id === selectedObject.id ? { ...o, ...data } : o))
    );
    setIsChangeModalOpen(false);
    setSelectedObject(null);
    methods.reset();
  };

  const filteredAndSortedObjects = useMemo(() => {
    let filtered = objects.filter((o) =>
      o.address.toLowerCase().includes(searchAddress.toLowerCase())
    );

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
  }, [objects, sortConfig, searchAddress]);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className={styles.wrapper}>
      <PageHeader icon={BuildingOfficeIcon} title="Адреса" />
      <Block>
        <FormProvider {...methods}>
          <div className={styles.searchBlock}>
            <div className={styles.searchField}>
              <InputField
                name="searchAddress"
                label="Поиск"
                placeholder="Адрес"
                required={false}
                rules={{
                  onChange: (e) => setSearchAddress(e.target.value),
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
                <th onClick={() => handleSort("address")}>
                  Адрес{" "}
                  {sortConfig.key === "address" &&
                    (sortConfig.direction === "asc" ? (
                      <ChevronUpIcon className={styles.sortIcon} />
                    ) : (
                      <ChevronDownIcon className={styles.sortIcon} />
                    ))}
                </th>
                <th onClick={() => handleSort("apartments")}>
                  Квартир{" "}
                  {sortConfig.key === "apartments" &&
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
              {filteredAndSortedObjects.slice(0, visibleCount).map((o) => (
                <tr key={o.id}>
                  <td>{o.id}</td>
                  <td>{o.address}</td>
                  <td>{o.apartments}</td>
                  <td className={styles.actions}>
                    <button
                      onClick={() => handleEditObject(o)}
                      className={styles.editButton}
                    >
                      <PencilIcon className={styles.actionIcon} />
                    </button>
                    <button
                      onClick={() => handleDeleteObject(o.id)}
                      className={styles.deleteButton}
                    >
                      <TrashIcon className={styles.actionIcon} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {visibleCount < filteredAndSortedObjects.length && (
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
            <ChangeObjectModal methods={methods} onSave={handleSaveEdit} />
          </Modal>

          <Modal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
          >
            <CreateNewObjectModal methods={methods} onSave={handleAddObject} />
          </Modal>
        </FormProvider>
      </Block>
    </div>
  );
}
