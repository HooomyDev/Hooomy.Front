import React, { useEffect, useState } from "react";
import styles from "./Notification.module.css";

export default function Notification({ children, duration = 3000, onClose }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  return <div className={styles.notification}>{children}</div>;
}
