import { apiClient as client } from "../client";

export const getComplaintCount = async () => {
  const res = await client.get("/complaints/count");

  const data = res.data;

  return data;
};

export const createComplaint = async (shortDescription, description, type) => {
  const res = await client.post("/complaints/create", {
    shortDescription,
    description,
    type,
  });

  const data = res.data;

  return data;
};

export const getComplaints = async (params = {}) => {
  const res = await client.get("/complaints", { params });

  const data = res.data.complaints;

  return data;
};

export const getComplaintDetails = async (id) => {
  const res = await client.get(`/complaints/${id}`);

  return res.data;
};

export const updateComplaintStatus = async (id, status) => {
  const res = await client.put(`/complaints/update`, {
    id: id,
    status: status,
    description: "",
    shortDescription: "",
  });
  return res.data;
};
