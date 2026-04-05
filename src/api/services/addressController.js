import { apiClient as client } from "../client";

export const findOrCreateAddress = async (lat, lng, address) => {
  const response = await client.get("/addresses/find-or-create", {
    params: { lat, lng, address },
  });
  return response.data;
};
