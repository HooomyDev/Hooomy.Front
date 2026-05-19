import React, { useState, useEffect, useRef } from "react";
import styles from "./Notifications.module.css";
import {
  BellIcon,
  ExclamationCircleIcon,
  ClipboardDocumentListIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/solid";

export default function Notifications({ notifications = [], onMarkAsRead }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Закрытие при клике вне компонента
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleNotificationClick = (notificationId) => {
    onMarkAsRead?.(notificationId);
  };

  return (
    <div className={styles.notificationContainer} ref={dropdownRef}>
      <button
        className={`${styles.notificationButton} ${
          unreadCount > 0 ? styles.haveNotifications : ""
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <BellIcon className={styles.icon} />
        {unreadCount > 0 && (
          <span className={styles.badge}>
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          <div className={styles.header}>
            <span className={styles.title}>Уведомления</span>
          </div>

          <div className={styles.list}>
            {notifications.length === 0 ? (
              <div className={styles.empty}>
                <BellIcon className={styles.emptyIcon} />
                <p>Нет уведомлений</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`${styles.notificationItem} ${
                    !notification.isRead ? styles.unread : ""
                  }`}
                  onClick={() => handleNotificationClick(notification.id)}
                >
                  {(() => {
                    const iconMap = {
                      0: <ExclamationCircleIcon className={styles.infoIcon} />,
                      1: <BellIcon className={styles.systemIcon} />,
                      2: (
                        <ClipboardDocumentListIcon
                          className={styles.requestIcon}
                        />
                      ),
                      3: <WrenchScrewdriverIcon className={styles.workIcon} />,
                    };
                    return iconMap[notification.type] || iconMap[0];
                  })()}
                  <div className={styles.content}>
                    <div className={styles.message}>{notification.message}</div>
                    {notification.date && (
                      <div className={styles.time}>
                        {new Date(notification.date).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                  {!notification.isRead && <div className={styles.unreadDot} />}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
