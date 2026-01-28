import React from "react";
import styles from "./AddressCard.module.css";
import {
  PencilSquareIcon,
  MapPinIcon,
  ClipboardDocumentCheckIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { useT } from "../../utils/useT";

export default function AddressCard({
  item,
  isEditing,
  onEditClick,
  onSaveClick,
  onChangeField,
  onDeleteClick,
}) {
  const t = useT();

  return (
    <div className={styles.item}>
      <input
        className={`${styles.itemPseudonym} ${
          isEditing ? styles.changing : ""
        }`}
        value={item.pseudonym}
        disabled={!isEditing}
        onChange={(e) => onChangeField(item.id, "pseudonym", e.target.value)}
      />
      <input
        className={`${styles.itemAddress} ${isEditing ? styles.changing : ""}`}
        value={item.address}
        disabled={!isEditing}
        onChange={(e) => onChangeField(item.id, "address", e.target.value)}
      />
      <div className={styles.itemButtons}>
        {!isEditing ? (
          <button
            className={styles.itemButton}
            onClick={() => onEditClick(item)}
            title={t("profile.changeAddress")}
          >
            <PencilSquareIcon className={styles.icon} />
          </button>
        ) : (
          <button
            className={styles.itemButton}
            onClick={onSaveClick}
            title={t("user.save")}
          >
            <ClipboardDocumentCheckIcon className={styles.icon} />
          </button>
        )}

        <button className={styles.itemButton} title={t("profile.onMap2")}>
          <MapPinIcon className={styles.icon} />
        </button>

        <button
          className={styles.itemButton}
          onClick={() => onDeleteClick(item.id)}
          title={t("profile.deleteAddress")}
        >
          <TrashIcon className={styles.icon} />
        </button>
      </div>
    </div>
  );
}
