import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Chats.module.css";
import PageHeader from "../../common/PageHeader/PageHeader";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/solid";
import Block from "../../common/Block/Block";
import { useQuery } from "@tanstack/react-query";
import { getChatDetails, getChats } from "../../api/services/chatService";
import Loader from "../../common/Loader/Loader";
import { useAuthStore } from "../../stores/authStore";
import ChatCard from "./components/ChatCard/ChatCard";
import ChatSearchForm from "./components/ChatSearchForm/ChatSearchForm";
import { HubConnectionBuilder } from "@microsoft/signalr";
import Chat from "../Chat/Chat";

export default function Chats() {
  const [filteredChats, setFilteredChats] = useState([]);
  const navigate = useNavigate();
  const user = useAuthStore((store) => store.user);
  const [messages, setMessages] = useState([]);
  const [connection, setConnection] = useState(null);
  const [selectedChatId, setSelectedChatId] = useState(null);

  const joinChat = async (userName, chatId) => {
    var connection = new HubConnectionBuilder()
      .withUrl("http://localhost:5001/chat-hub")
      .withAutomaticReconnect()
      .build();

    connection.on("ReceiveMessage", (userName, message) => {
      setMessages((messages) => [...messages, { userName, message }]);
    });

    try {
      await connection.start();
      await connection.invoke("JoinChat", { userName, chatId });

      setConnection(connection);
    } catch (error) {
      console.log(error);
    }
  };

  const closeChat = async () => {
    await connection.stop();
    setConnection(null);
  };

  const { data: chats, isLoading } = useQuery({
    queryKey: ["chats"],
    queryFn: () => getChats(user),
    staleTime: 5 * 1000,
  });

  const handleChatClick = async (chatId) => {
    setSelectedChatId(chatId);
    await joinChat(`${user.surname} ${user.firstName}`, chatId);
  };

  const sendMessage = (message) => {
    connection.invoke("SendAsync", message);
  };

  useEffect(() => {
    if (chats) {
      setFilteredChats(chats);
    }
  }, [chats]);

  const onSubmit = (data) => {
    const filtered =
      chats?.filter((chat) =>
        chat.companyName.toLowerCase().includes(data.search.toLowerCase())
      ) || [];

    setFilteredChats(filtered);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {connection ? (
        <Chat
          chatId={selectedChatId}
          messages={messages}
          sendMessage={sendMessage}
          closeChat={closeChat}
        />
      ) : (
        <div className={styles.wrapper}>
          <PageHeader title="Чаты" icon={ChatBubbleBottomCenterTextIcon} />
          <div className={styles.container}>
            <ChatSearchForm onSubmit={onSubmit} user={user} />
            <Block>
              <div className={styles.chats}>
                {chats.length === 0 ? (
                  <div className={styles.empty}>
                    <ChatBubbleBottomCenterTextIcon className={styles.icon} />
                    Нет чатов
                  </div>
                ) : (
                  filteredChats.map((chat) => (
                    <li key={chat.id}>
                      <ChatCard chat={chat} handleChatClick={handleChatClick} />
                    </li>
                  ))
                )}
              </div>
            </Block>
          </div>
        </div>
      )}
    </>
  );
}
