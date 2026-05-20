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

export const uploadRequestCommentPhotos = async (commentId, formData) => {
  const res = await client.post(
    `/requests/comments/${commentId}/upload-comment-images`,
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

export const getRequestStatistic = async (period = 1, companyId) => {
  const params = new URLSearchParams({
    period: period,
    companyId: companyId ?? "",
  });
  const res = await client.get(`/requests/statistic?${params.toString()}`);

  const data = res.data;

  return data ?? [];
};

export const getRequestsForAdmin = async (
  page = 1,
  pageSize = 10,
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

export const getCommentCount = async (requestId = null, filter = "all") => {
  const params = new URLSearchParams();
  if (requestId !== null) params.append("requestId", requestId);
  params.append("filter", filter);

  const res = await client.get(`requests/comments/count?${params.toString()}`);

  return res.data;
};

// Получить комментарии заявки
export const getRequestComments = async (
  requestId,
  page = 1,
  pageSize = 5,
  status,
  text
) => {
  const params = new URLSearchParams();
  if (requestId) params.append("requestId", requestId);
  if (status) params.append("status", status);
  if (text) params.append("text", text);
  params.append("page", page);
  params.append("pageSize", pageSize);

  const response = await client.get(`/requests/comments?${params.toString()}`);

  return response.data;
};

export const getComment = async (id) => {
  const response = await client.get(`requests/comments/${id}`);

  return response.data;
};

// Добавить комментарий
export const addComment = async (requestId, companyId, text) => {
  const response = await client.post(`/requests/add-comment`, {
    requestId: requestId,
    companyId: companyId,
    text: text,
  });
  return response.data;
};

export const updateComment = async (requestComment) => {
  const response = await client.put(`/requests/comments/update`, {
    id: requestComment.id,
    text: requestComment.text,
    status: requestComment.status,
  });
  return response.data;
};

export const deleteComment = async (id) => {
  const response = await client.delete(`requests/comments/delete/${id}`);
  return response.data;
};

export const deleteCommentPhoto = async (commentId, imageId) => {
  const response = await client.delete(
    `/requests/comments/${commentId}/images/${imageId}`
  );
  return response.data;
};

// Обновить заявку
export const updateRequest = async (request) => {
  const response = await client.put(`/requests/update`, {
    id: request.id,
    title: request.title,
    description: request.description,
    category: request.category,
    status: request.status,
  });
  return response.data;
};

export const reviewRequest = async (requestId, score, text) => {
  const response = await client.post(`/requests/${requestId}/review`, {
    score: score,
    text: text,
  });

  return response.data;
};

export const deleteReview = async (reviewId) => {
  const response = await client.delete(`/requests/delete-review/${reviewId}`);

  return response.data;
};
