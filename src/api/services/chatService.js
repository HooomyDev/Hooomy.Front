import { apiClient as client } from "../client";

export const getChats = async (user) => {
  let res;
  if (user.role === "Resident") {
    res = await client.get("chats");
  } else if (user.role === "Employee") {
    res = await client.get(`chats/company-chats/${user.companyId}`);
  }

  const data = res.data.chats ?? [];

  return data;
};

export const getChatDetails = async (chatId) => {
  const res = await client.get(`chats/${chatId}`);

  console.log(res.data);

  return res.data;
};

export const createChat = async (companyId) => {
  try {
    const res = await client.post("/chats/create", {
      companyId: companyId,
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    if (error.response?.status === 409) {
      const res = await client.get(`/chats/${companyId}`);
      console.log(res.data);
      return res.data.id;
    }
  }
};

export const getMessages = async (chatId) => {
  const res = await client.get(`/chats/${chatId}/messages`);

  const data = res.data?.messages ?? [];

  return data;
};
