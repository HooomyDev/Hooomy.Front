import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { ReactComponent as CrossIcon } from "../../assets/cross.svg";
import styles from "./Modal.module.css";
import SmoothlyWrapper from "../SmoothlyWrapper/SmoothlyWrapper";

export default function Modal({ isOpen, onClose, children }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={`${styles.modal} ${isOpen ? styles.open : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.close} onClick={onClose}>
          <CrossIcon className={styles.icon} />
        </button>
        <SmoothlyWrapper>{children}</SmoothlyWrapper>
      </div>
    </div>,
    document.body
  );
}
