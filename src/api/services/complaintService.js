import { apiClient as client } from "../client";

export const getComplaintCount = async () => {
  const res = await client.get("/complaints/count");

  const data = res.data;

  return data;
};
