import { apiClient as client } from "../client";

export const getRequestDetails = async (id) => {
  const res = await client.get(`/requests/${id}`);

  const data = res.data;

  return data;
};

export const getMyRequests = async () => {
  const res = await client.get("/requests");

  const data = res.data.requests;

  return data;
};

export const createRequest = async (data) => {
  const res = await client.post("/requests/create", {
    title: data.title,
    description: data.description,
    address: data.address,
    photo: "",
  });

  return res.data.id;
};

export const getRequestCount = async () => {
  const res = await client.get(`/requests/count`);

  const data = res.data;

  return data;
};

export const getRequestStatistic = async (period = 1) => {
  const res = await client.get(`/requests/statistic?period=${period}`);

  await getMyRequests();

  const data = res.data.requests;

  return data ?? [];
};
