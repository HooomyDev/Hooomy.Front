import React from "react";
import ReactDOM from "react-dom";
import Button from "../Button/Button";
import styles from "./ConfirmDialog.module.css";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Подтвердить",
  cancelText = "Отмена",
  confirmVariant = "primary",
}) {
  if (!isOpen) return null;

  const modalRoot = document.getElementById("modal-root");

  return ReactDOM.createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <div className={styles.iconWrapper}>
          <ExclamationTriangleIcon className={styles.icon} />
        </div>
        <div className={styles.title}>{title}</div>
        <div className={styles.message}>{message}</div>
        <div className={styles.actions}>
          <Button variant="secondary" onClick={onClose}>
            {cancelText}
          </Button>
          <Button variant={confirmVariant} onClick={onConfirm}>
            {confirmText}
          </Button>
        </div>
      </div>
    </div>,
    modalRoot,
  );
}
