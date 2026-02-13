import { authClient as client } from "../client";

export const getUserCount = async () => {
  const res = await client.get("/admin/users/count");

  const data = res.data;

  return data;
};
