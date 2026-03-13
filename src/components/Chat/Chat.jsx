import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./Chat.module.css";
import { ArrowLeftIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";
import Button from "../../common/Button/Button";
import InputField from "../../common/InputField/InputField";
import { FormProvider, useForm } from "react-hook-form";

export default function Chat() {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
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
    {
      id: 2,
      senderId: 2,
      senderName: "Вы",
      senderType: 2,
      content: "Привет! Как дела?",
      messageType: 1,
      createdAt: new Date().toISOString().split("T")[0],
      isRead: false,
      readAt: null,
    },
  ]);

  const methods = useForm({
    defaultValues: {
      message: "",
    },
  });

  const currentUserId = 2;

  const handleSendMessage = (data) => {
    if (!data.message.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      senderId: currentUserId,
      senderName: "Вы",
      senderType: 2,
      content: data.message,
      messageType: 1,
      createdAt: new Date().toISOString().split("T")[0],
      isRead: false,
      readAt: null,
    };

    setMessages([...messages, newMessage]);
    methods.reset();
  };

  const otherPerson = messages.find((m) => m.senderId !== currentUserId) || {
    senderName: "Пользователь",
    senderId: 1,
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          <ArrowLeftIcon className={styles.icon} />
        </button>
        <div className={styles.userInfo}>
          <div className={styles.avatar}>
            {otherPerson.senderName.charAt(0)}
          </div>
          <div className={styles.details}>
            <span className={styles.name}>{otherPerson.senderName}</span>
            <span className={styles.status}>
              {messages.some((m) => !m.isRead && m.senderId !== currentUserId)
                ? "Новое сообщение"
                : "онлайн"}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.messages}>
        {messages.map((msg) => {
          const isMine = msg.senderId === currentUserId;

          return (
            <div
              key={msg.id}
              className={`${styles.messageWrapper} ${
                isMine ? styles.myMessage : styles.theirMessage
              }`}
            >
              {!isMine && (
                <div className={styles.messageAvatar}>
                  {msg.senderName.charAt(0)}
                </div>
              )}
              <div className={styles.messageContent}>
                <div className={styles.messageBubble}>
                  {msg.messageType === 2 ? (
                    <img
                      src={msg.content}
                      alt="Фото"
                      className={styles.messageImage}
                    />
                  ) : (
                    msg.content
                  )}
                </div>
                <div className={styles.messageFooter}>
                  <span className={styles.messageTime}>{msg.createdAt}</span>
                  {isMine && msg.isRead && (
                    <span className={styles.readStatus}>✓✓</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(handleSendMessage)}
          className={styles.inputArea}
        >
          <InputField
            name="message"
            type="text"
            placeholder="Напишите сообщение..."
            rules={{}}
          />
          <Button
            type="submit"
            className={styles.sendButton}
            variant="secondary"
          >
            <PaperAirplaneIcon className={styles.sendIcon} />
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}
