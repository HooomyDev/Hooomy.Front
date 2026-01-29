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
  onDeleteClick,
}) {
  const t = useT();

  return (
    <div className={styles.item}>
      <div className={styles.itemPseudonym}>{item.pseudonym}</div>

      <div className={styles.itemAddress}>
        {item.street}, {item.house}
      </div>

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
          onClick={() => onDeleteClick(item)}
          title={t("profile.deleteAddress")}
        >
          <TrashIcon className={styles.icon} />
        </button>
      </div>
    </div>
  );
}
