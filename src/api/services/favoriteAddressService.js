import { apiClient as client } from "../client";

export const getFavoriteAddresses = async () => {
  try {
    const res = await client.get("/favorite-addresses");
    const data = res.data.favoriteAddresses;
    return data || [];
  } catch (error) {
    console.error("Ошибка при получении избранных адресов:", error);
    return [];
  }
};

export const createFavoriteAddress = async (data) => {
  try {
    const res = await client.post("/favorite-addresses/create", {
      addressId: data.street,
      pseudonym: data.pseudonym,
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updateFavoriteAddress = async (data) => {
  try {
    const res = await client.put("/favorite-addresses/update", {
      id: data.id,
      street: data.street,
      house: data.house,
      pseudonym: data.pseudonym,
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteFavoriteAddress = async (data) => {
  try {
    const res = await client.delete("/favorite-addresses/delete/" + data.id);

    return res.data;
  } catch (error) {
    throw error;
  }
};
