import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./Chat.module.css";
import { ArrowLeftIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";
import InputField from "../../common/InputField/InputField";
import Button from "../../common/Button/Button";
import { FormProvider, useForm } from "react-hook-form";
import { useAuthStore } from "../../stores/authStore";
import { useQuery } from "@tanstack/react-query";
import { getChatDetails } from "../../api/services/chatService";
import Loader from "../../common/Loader/Loader";

export default function Chat({ chatId, messages, sendMessage, closeChat }) {
  const user = useAuthStore((store) => store.user);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  const { data: chat, isLoading } = useQuery({
    queryKey: ["chat"],
    queryFn: async () => await getChatDetails(chatId),
    staleTime: 5 * 1000,
    enabled: !!chatId,
  });

  const methods = useForm({
    defaultValues: { message: "" },
  });

  const handleSendMessage = async (data) => {
    if (!data.message.trim()) return;

    sendMessage(data.message);

    methods.reset();
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={() => closeChat()}>
          <ArrowLeftIcon className={styles.icon} />
        </button>
        <div className={styles.userInfo}>
          <div className={styles.avatar}>
            {(user.role === "Resident" ? chat.companyName : chat?.residentName)
              .charAt(0)
              .toUpperCase()}
          </div>
          <span className={styles.name}>
            {user.role === "Resident" ? chat.companyName : chat?.residentName}
          </span>
        </div>
      </div>

      <div className={styles.messages} ref={messagesContainerRef}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`${styles.messageWrapper} ${
              msg.userName === `${user.surname} ${user.firstName}`
                ? styles.myMessage
                : styles.theirMessage
            }`}
          >
            <div className={styles.messageSender}>{msg.userName}</div>
            <div className={styles.messageBubble}>{msg.message}</div>
          </div>
        ))}
        <span ref={messagesEndRef} />
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
            variant="secondary"
            className={styles.sendButton}
          >
            <PaperAirplaneIcon className={styles.sendIcon} />
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}
