import React, { useState } from "react";
import styles from "./ProfileMyAddressesSection.module.css";
import {
  HomeIcon,
  PencilSquareIcon,
  MapPinIcon,
  PlusCircleIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/solid";
import ProfileSectionWrapper from "../ProfileSectionWrapper/ProfileSectionWrapper";

export default function ProfileMyAddressesSection() {
  const [editingId, setEditingId] = useState(null);

  const [favAddresses, setFavAddresses] = useState([
    { id: 1, pseudonym: "main", address: "ул. Ленина, д. 10, кв. 5" },
    { id: 2, pseudonym: "work", address: "пр. Независимости, д. 25, офис 301" },
  ]);

  const handleEditClick = (id) => {
    setEditingId(id);
  };

  const handleSaveClick = () => {
    setEditingId(null);
  };

  const handleAddNewAddress = () => {
    const newAddress = {
      id: favAddresses[favAddresses.length - 1].id + 1,
      pseudonym: "new",
      address: "Введите адрес...",
    };
    setFavAddresses([...favAddresses, newAddress]);
    setEditingId(newAddress.id);
  };

  return (
    <ProfileSectionWrapper title="Мои адреса" Icon={HomeIcon}>
      <div className={styles.list}>
        {favAddresses.map((item) => {
          const isEditing = editingId === item.id;
          return (
            <div key={item.id} className={styles.item}>
              <input
                className={`${styles.itemPseudonym} ${
                  isEditing ? styles.changing : ""
                }`}
                value={item.pseudonym}
                disabled={!isEditing}
                onChange={(e) =>
                  setFavAddresses(
                    favAddresses.map((addr) =>
                      addr.id === item.id
                        ? { ...addr, pseudonym: e.target.value }
                        : addr
                    )
                  )
                }
              />
              <input
                className={`${styles.itemAddress} ${
                  isEditing ? styles.changing : ""
                }`}
                value={item.address}
                disabled={!isEditing}
                onChange={(e) =>
                  setFavAddresses(
                    favAddresses.map((addr) =>
                      addr.id === item.id
                        ? { ...addr, address: e.target.value }
                        : addr
                    )
                  )
                }
              />
              <div className={styles.itemButtons}>
                <div className={styles.wrap}>
                  {!isEditing ? (
                    <button
                      className={styles.itemButton}
                      onClick={() => handleEditClick(item.id)}
                      title="Изменить адрес"
                    >
                      <PencilSquareIcon className={styles.icon} />
                    </button>
                  ) : (
                    <button
                      className={styles.itemButton}
                      onClick={handleSaveClick}
                      title="Сохранить"
                    >
                      <ClipboardDocumentCheckIcon className={styles.icon} />
                    </button>
                  )}
                </div>

                <button
                  className={styles.itemButton}
                  title="Показать адрес на карте"
                >
                  <MapPinIcon className={styles.icon} /> На карте
                </button>
              </div>
            </div>
          );
        })}

        <div className={styles.item}>
          <div className={styles.itemPseudonym}>Новый адрес</div>
          <div className={styles.itemAddress}>Добавить новый адрес</div>
          <button
            className={styles.addButton}
            onClick={() => {
              handleAddNewAddress();
            }}
          >
            <PlusCircleIcon className={styles.icon} /> Добавить адрес
          </button>
        </div>
      </div>
    </ProfileSectionWrapper>
  );
}
