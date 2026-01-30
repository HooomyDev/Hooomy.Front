import { apiClient as client } from "../client";

export const getRequestDetails = async (id) => {
  const res = await client.get(`requests/${id}`);

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
