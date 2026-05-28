import { apiClient as client } from "../client";

export const createRequestNotification = async (requestId, text) => {
  const res = await client.post("/notifications/request/create", {
    requestId: requestId,
    text: text,
  });

  return res.data;
};

export const createWorkNotification = async (workId, text) => {
  const res = await client.post("/notifications/work/create", {
    workId: workId,
    text: text,
  });

  return res.data;
};

export const getNotifications = async (page = 1, pageSize = 15) => {
  const params = new URLSearchParams({ page: page, pageSize: pageSize });
  const res = await client.get(`/notifications?${params.toString()}`);
  return res.data;
};
