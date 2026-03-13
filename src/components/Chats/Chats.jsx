import React, { useState } from "react";
import styles from "./Chats.module.css";
import PageHeader from "../../common/PageHeader/PageHeader";
import {
  ChatBubbleBottomCenterTextIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import Block from "../../common/Block/Block";
import { FormProvider, useForm } from "react-hook-form";
import InputField from "../../common/InputField/InputField";
import Button from "../../common/Button/Button";
import { useNavigate } from "react-router-dom";
import routes from "../../stores/routes.json";

/* 
Chat status:
    Active = 1
    Closed = 2
    Pending = 3
Sender type:
    Resident = 1
    Employee = 2
Message type:
    Text = 1
    Photo = 2
*/

export default function Chats() {
  const chats = [
    {
      id: 1,
      residentId: 1,
      status: 1,
      lastMessage: {
        id: 1,
        senderId: 1,
        senderName: "Артём",
        senderType: 1,
        content: "Привет, Мир!:)",
        messageType: 1,
        createdAt: "2026-03-12",
        isRead: false,
        readAt: "2026-03-12",
      },
      createdAt: "2026-03-11",
      updatedAt: "2026-03-11",
      unreadCount: 1,
    },
    {
      id: 2,
      residentId: 2,
      status: 1,
      lastMessage: {
        id: 1,
        senderId: 1,
        senderName: "Паша",
        senderType: 1,
        content: "Привет, Мир!:)",
        messageType: 1,
        createdAt: "2026-03-12",
        isRead: true,
        readAt: "2026-03-12",
      },
      createdAt: "2026-03-11",
      updatedAt: "2026-03-11",
      unreadCount: 0,
    },
  ];

  const navigate = useNavigate();

  const handleChatClick = (chatId) => {
    navigate(`${routes.chat}/${chatId}`);
  };

  const [filteredChats, setFilteredChats] = useState(chats);

  const methods = useForm({
    defaultValues: {
      search: "",
    },
  });

  const onSearch = (data) => {
    const searchTerm = data.search.toLowerCase().trim();

    if (!searchTerm) {
      setFilteredChats(chats);
      return;
    }

    const filtered = chats.filter(
      (chat) =>
        chat.lastMessage.senderName.toLowerCase().includes(searchTerm) ||
        chat.lastMessage.content.toLowerCase().includes(searchTerm)
    );

    setFilteredChats(filtered);
  };

  return (
    <div className={styles.wrapper}>
      <PageHeader title="Чаты" icon={ChatBubbleBottomCenterTextIcon} />
      <Block>
        <div className={styles.container}>
          <div className={styles.search}>
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSearch)}>
                <InputField
                  name="search"
                  type="text"
                  placeholder="Поиск по чатам..."
                  rules={{}}
                />
                <Button
                  type="submit"
                  className={styles.searchButton}
                  variant="secondary"
                >
                  <MagnifyingGlassIcon className={styles.icon} />
                </Button>
              </form>
            </FormProvider>
          </div>
          <div className={styles.chats}>
            {filteredChats.map((chat) => (
              <div
                key={chat.id}
                className={
                  chat.lastMessage.isRead ? styles.chatRead : styles.chatUnread
                }
                onClick={() => handleChatClick(chat.id)}
              >
                <div className={styles.avatar}>
                  {chat.lastMessage.senderName.charAt(0)}
                </div>
                <div className={styles.content}>
                  <div className={styles.header}>
                    <span className={styles.name}>
                      {chat.lastMessage.senderName}
                    </span>
                    <span className={styles.date}>
                      {chat.lastMessage.createdAt}
                    </span>
                  </div>
                  <div className={styles.message}>
                    <span
                      className={
                        chat.lastMessage.isRead ? styles.read : styles.unread
                      }
                    >
                      {chat.lastMessage.content}
                    </span>
                    {chat.unreadCount > 0 && (
                      <span className={styles.badge}>{chat.unreadCount}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Block>
    </div>
  );
}
