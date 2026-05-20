import { authClient as client } from "../client";

export const getUserCount = async () => {
  const res = await client.get("/admin/users/count");

  const data = res.data;

  return data;
};

export const getUserList = async (page = 1, pageSize = 10) => {
  const res = await client.get(
    `admin/users/list?page=${page}&pageSize=${pageSize}`
  );

  const data = res.data;

  return data.items;
};

//Approved, Banned, Deleted
export const changeUserStatus = async (id, status) => {
  const res = await client.put(`admin/users/${id}/status?status=${status}`);
  return res.data;
};

export const getUsersForCompany = async (companyId) => {
  const res = await client.get(
    `admin/users/get-users-for-company/${companyId}`
  );
  return res.data;
};

export const addUserToCompany = async (data) => {
  const res = await client.post("admin/users/add-to-company", data);
  return res.data;
};

export const removeUserFromCompany = async (userId) => {
  const res = await client.delete(`admin/users/${userId}`);
  return res.data;
};

export const changePassword = async (oldPassword, newPassword, email) => {
  const res = await client.post("auth/change-password", {
    oldPassword,
    newPassword,
    email,
  });
  return res.data;
};

export const forgotPassword = async (email) => {
  const response = await client.post("/auth/forgot-password", { email });
  return response.data;
};

export const resetPassword = async (data) => {
  const response = await client.post("/auth/reset-password", data);
  return response.data;
};
