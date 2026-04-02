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

export const getRequestCategories = async () => {
  const res = await client.get("/requests/categories");

  const data = res.data.categories;

  return data;
};

export const createRequest = async (title, description, address, category) => {
  console.log({ title, description, address, category });

  const res = await client.post("/requests/create", {
    title: title,
    description: description,
    address: address,
    category: category,
  });

  return res.data;
};

export const uploadRequestPhotos = async (requestId, formData) => {
  const res = await client.post(
    `/requests/${requestId}/upload-images`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return res.data;
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
