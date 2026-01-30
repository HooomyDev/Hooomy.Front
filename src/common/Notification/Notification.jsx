import React, { useEffect, useState } from "react";
import styles from "./Notification.module.css";
import {
  InformationCircleIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

export default function Notification({
  children,
  duration = 3000,
  onClose,
  type = "info",
}) {
  const [visible, setVisible] = useState(true);

  const STYLES_MAP = {
    info: styles.info,
    error: styles.error,
    success: styles.success,
  };

  const ICON_MAP = {
    info: <InformationCircleIcon className={styles.icon} />,
    error: <ExclamationTriangleIcon className={styles.icon} />,
    success: <CheckCircleIcon className={styles.icon} />,
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  return (
    <div className={`${styles.notification} ${STYLES_MAP[type]}`}>
      {ICON_MAP[type]}
      {children}
    </div>
  );
}
