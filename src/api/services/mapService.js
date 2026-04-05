import { apiClient as client } from "../client";

export const getMapData = async (filters) => {
  const response = await client.get("requests/map", {
    params: {
      zoom: filters.zoom || 12,
      month: filters.month,
      status: filters.status,
    },
  });
  return response.data;
};

export const getAddresses = async () => {
  const response = await client.get("/addresses");
  return response.data;
};
