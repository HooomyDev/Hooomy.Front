import { apiClient as client } from "../client";

export const getWorks = async () => {
  const res = await client.get("/works");

  const data = res.data.works;

  return data;
};

export const getWorksForEmployee = async (
  addressId,
  category,
  seriosness,
  searchTitle,
  page = 1,
  pageSize = 10
) => {
  const params = new URLSearchParams({
    page: page,
    pageSize: pageSize,
    addressId: addressId || "",
    category: category || "",
    seriousness: seriosness || "",
    searchTitle: searchTitle || "",
  });

  const res = await client.get(`/works/get-for-employee?${params.toString()}`);

  const data = res.data;

  return data;
};

export const deleteWork = async (id) => {
  const res = await client.delete(`/works/delete/${id}`);

  return res.data;
};

export const updateWork = async (workData) => {
  const response = await client.put(`/works/update`, workData);
  return response.data;
};
