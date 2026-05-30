import { apiClient as client } from "../client";

export const createSystemNotification = async (text) => {
  const res = await client.post("/notifications/system/create", {
    text,
  });

  return res.data;
};
