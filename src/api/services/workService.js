import { apiClient as client } from "../client";

export const getWorks = async () => {
  const res = await client.get("/works");

  const data = res.data.works;

  return data;
};
