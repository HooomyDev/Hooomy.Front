import { apiClient as client } from "../client";

export const getRequestDetails = async (id) => {
  const res = await client.get(`/requests/${id}`);

  const data = res.data;

  return data;
};

export const getMyRequests = async (requestStatus, startDate, endDate) => {
  const params = new URLSearchParams();

  if (
    requestStatus !== undefined &&
    requestStatus !== null &&
    requestStatus !== 0
  ) {
    params.append("requestStatus", requestStatus);
  }

  if (startDate) {
    const start = startDate instanceof Date ? startDate : new Date(startDate);
    params.append("startDate", start.toISOString());
  }

  if (endDate) {
    const end = endDate instanceof Date ? endDate : new Date(endDate);
    params.append("endDate", end.toISOString());
  }

  const queryString = params.toString();
  const url = queryString ? `/requests?${queryString}` : "/requests";

  const res = await client.get(url);
  return res.data.requests;
};

export const getRequestCategories = async () => {
  const res = await client.get("/requests/categories");

  const data = res.data.categories;

  return data ?? [];
};

export const createRequest = async (title, description, address, category) => {
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

export const getRequestsForAdmin = async (
  page,
  pageSize,
  searchTitle,
  searchStatus,
  searchCategory,
  companyId
) => {
  const params = new URLSearchParams();
  params.append("page", page);
  params.append("pageSize", pageSize);

  if (searchTitle) params.append("title", searchTitle);
  if (searchStatus) params.append("status", searchStatus);
  if (searchCategory) params.append("category", searchCategory);
  if (companyId) params.append("companyId", companyId);

  const res = await client.get(`/requests/administration?${params.toString()}`);
  return res.data;
};

export const softDeleteRequest = async (id) => {
  await client.delete(`requests/delete/${id}`);
};

// Получить комментарии заявки
export const getRequestComments = async (requestId) => {
  const response = await client.get(`/requests/${requestId}/comments`);
  return response.data;
};

// Добавить комментарий
export const addComment = async (requestId, text) => {
  const response = await client.post(`/requests/add-comment`, {
    requestId: requestId,
    text: text,
  });
  return response.data;
};

// Обновить заявку
export const updateRequest = async (request) => {
  console.log(request);
  const response = await client.put(`/requests/update`, {
    id: request.id,
    title: request.title,
    description: request.description,
    category: request.category,
    status: request.status,
  });
  return response.data;
};
