import { apiClient as client } from "../client";

export const getRequestDetails = async (id) => {
  const res = await client.get(`/requests/${id}`);

  const data = res.data;

  return data;
};

export const getMyRequests = async (requestStatus, startDate, endDate) => {
  const params = {};

  if (requestStatus !== undefined) {
    params.requestStatus = requestStatus;
  }

  if (startDate) {
    params.startDate = startDate.toISOString?.() || startDate;
  }

  if (endDate) {
    params.endDate = endDate.toISOString?.() || endDate;
  }

  const res = await client.get(`/requests`, { params });

  return res.data.requests;
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
    addressId: address,
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
