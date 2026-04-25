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
