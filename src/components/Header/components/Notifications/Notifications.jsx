import React, { useState, useRef } from "react";
import styles from "./Notifications.module.css";
import {
  BellIcon,
  ExclamationCircleIcon,
  ClipboardDocumentListIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/solid";
import { createPortal } from "react-dom";
import { getNotifications } from "../../../../api/services/notificationService";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import routes from "../../../../stores/routes.json";

export default function Notifications() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [pagination] = useState({
    page: 1,
    pageSize: 15,
  });
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["notifications", pagination.page, pagination.pageSize],
    queryFn: async () => {
      return await getNotifications(pagination.page, pagination.pageSize);
    },
  });

  if (isLoading) {
    return null;
  }

  return (
    <div className={styles.notificationContainer} ref={dropdownRef}>
      <button
        className={styles.notificationButton}
        onClick={() => setIsOpen(!isOpen)}
      >
        <BellIcon className={styles.icon} />
      </button>

      {isOpen &&
        createPortal(
          <div className={styles.dropdown}>
            <div className={styles.header}>
              <span className={styles.title}>Уведомления</span>
            </div>

            <div className={styles.list}>
              {!data?.notifications ? (
                <div className={styles.empty}>
                  <BellIcon className={styles.emptyIcon} />
                  <div className={styles.text}>Нет уведомлений</div>
                </div>
              ) : (
                data?.notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={styles.notificationItem}
                    onClick={() => {
                      if (notification?.type === 2) {
                        setIsOpen(false);
                        navigate(`${routes.works}`);
                      }
                      if (notification?.type === 3) {
                        setIsOpen(false);
                        navigate(`${routes.myRequests}`);
                      }
                    }}
                  >
                    {(() => {
                      const iconMap = {
                        0: (
                          <ExclamationCircleIcon className={styles.infoIcon} />
                        ),
                        1: <BellIcon className={styles.systemIcon} />,
                        3: (
                          <ClipboardDocumentListIcon
                            className={styles.requestIcon}
                          />
                        ),
                        2: (
                          <WrenchScrewdriverIcon className={styles.workIcon} />
                        ),
                      };
                      return iconMap[notification.type] || iconMap[0];
                    })()}
                    <div className={styles.content}>
                      <div className={styles.message}>{notification.text}</div>
                      {notification.date && (
                        <div className={styles.time}>
                          {new Date(notification.date).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
