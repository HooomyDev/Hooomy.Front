import React from "react";
import styles from "./ChatCard.module.css";
import { useAuthStore } from "../../../../stores/authStore";

export default function ChatCard({ chat, handleChatClick }) {
  const { user } = useAuthStore();
  return (
    <div className={styles.chat} onClick={() => handleChatClick(chat.id)}>
      <div className={styles.avatar}>{chat.companyName.charAt(0) || "?"}</div>
      <div className={styles.content}>
        <div className={styles.header}>
          <span className={styles.name}>
            {user?.role === "Resident"
              ? chat.companyName
              : chat.residentName || "Чат"}
          </span>
          <span className={styles.date}>
            {new Date(chat.lastMessageSentAt).toLocaleDateString()}
          </span>
        </div>
        <div className={styles.message}>
          <span className={chat.unreadCount > 0 ? styles.unread : styles.read}>
            {chat.lastMessageContent || "Нет сообщений"}
          </span>
        </div>
      </div>
    </div>
  );
}
