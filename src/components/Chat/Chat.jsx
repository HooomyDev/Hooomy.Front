import React, { useEffect, useState } from "react";
import styles from "./Chat.module.css";
import { ArrowLeftIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";
import InputField from "../../common/InputField/InputField";
import Button from "../../common/Button/Button";
import { FormProvider, useForm } from "react-hook-form";
import { useAuthStore } from "../../stores/authStore";
import { useQuery } from "@tanstack/react-query";
import { getChatDetails } from "../../api/services/chatService";
import Loader from "../../common/Loader/Loader";
import { useNavigate } from "react-router-dom";
import routes from "../../stores/routes.json";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import CreateComplaintModal, {
  COMPLAINT_TYPES,
} from "../../features/modals/CreateComplaintModal/CreateComplaintModal";
import { useT } from "../../utils/useT";

export default function Chat({
  chatId,
  messages,
  setMessages,
  sendMessage,
  closeChat,
}) {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const t = useT();
  const [isComplaintModalOpen, setIsComplaintModalOpen] = useState(false);

  const MESSAGE_TYPE_MAP = {
    resident: 1,
    employee: 2,
    system: 3,
  };

  const { data: chat, isLoading } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: async () => {
      const data = await getChatDetails(chatId);
      console.log(data);
      return data;
    },
    staleTime: 5 * 1000,
    enabled: !!chatId,
  });

  useEffect(() => {
    if (chat) {
      const messages = chat.messages.map((message) => {
        return { userName: message.senderName, message };
      });
      setMessages(messages);
    }
  }, [chat, setMessages]);

  const methods = useForm({
    defaultValues: { message: "" },
  });

  const handleSendMessage = async (data) => {
    if (!data.message.trim()) return;

    const message = {
      chatId: chat.id,
      senderType: user.role === "Resident" ? 1 : 2,
      senderName: `${user.surname} ${user.firstName}`,
      messageType: 1,
      content: data.message,
    };

    sendMessage(message);

    methods.reset();
  };

  const isMyMessage = (msg) => {
    // Если пользователь - жилец чата
    if (user?.role === "Resident") {
      return msg.senderType === 1; // Сравниваем с типом "Жилец"
    }
    // Если пользователь - сотрудник компании
    if (user?.companyId === chat.companyId) {
      return msg.senderType === 2; // Сравниваем с типом "Сотрудник"
    }
    return false;
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={() => closeChat()}>
          <ArrowLeftIcon className={styles.icon} />
        </button>
        <div
          className={`${styles.userInfo} ${
            user.role === "Resident" ? styles.companyInfo : ""
          }`}
          onClick={() => {
            if (user.role === "Resident") {
              navigate(`${routes.companies}/${chat?.companyId}`);
            }
          }}
        >
          <div className={styles.avatar}>
            {(user.role === "Resident" ? chat?.companyName : chat?.residentName)
              .charAt(0)
              .toUpperCase()}
          </div>
          <span className={styles.name}>
            {user.role === "Resident" ? chat.companyName : chat?.residentName}
          </span>
        </div>
        {user.role === "Employee" && (
          <Button
            className={styles.createComplaintButton}
            title={t("chats.createComplaint")}
            onClick={() => setIsComplaintModalOpen(true)}
          >
            <ExclamationTriangleIcon />
          </Button>
        )}
      </div>

      <div className={styles.messages}>
        {messages.map((msg, index) => {
          console.log(msg);
          return (
            <div
              key={index}
              className={`${styles.messageWrapper} ${
                isMyMessage(msg.message)
                  ? styles.myMessage
                  : styles.theirMessage
              }
            ${
              msg.message.messageType === MESSAGE_TYPE_MAP["system"]
                ? styles.systemMessage
                : ""
            }`}
            >
              <div className={styles.messageSender}>
                {msg.message.senderType === 2 ? chat.companyName : msg.userName}
              </div>
              <div className={styles.messageBubble}>{msg.message.content}</div>
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
            placeholder={t("chats.messagePlaceholder")}
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

      <CreateComplaintModal
        isOpen={isComplaintModalOpen}
        onClose={() => setIsComplaintModalOpen(false)}
        type={COMPLAINT_TYPES[0].value}
        data={chat}
      />
    </div>
  );
}
