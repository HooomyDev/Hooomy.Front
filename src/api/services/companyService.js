import { apiClient as client } from "../client";

export const getCompanies = async () => {
  const res = await client.get("companies");

  const data = res.data.companies ?? [];

  return data;
};

export const getCompanyDetails = async (companyId) => {
  const res = await client.get(`companies/${companyId}`);

  const data = res.data;

  return data;
};
