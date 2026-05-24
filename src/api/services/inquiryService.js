import { apiClient as client } from "../client";

export const createInquiry = async (userEmail, message) => {
  const res = await client.post(`inquiries/create`, {
    userEmail: userEmail,
    message: message,
  });

  return res.data;
};

export const getInquiries = async (page = 1, pageSize = 10, date) => {
  const params = new URLSearchParams({
    page: page,
    pageSize: pageSize,
    date: date || "",
  });

  const res = await client.get(`inquiries?${params.toString()}`);

  return res.data;
};
