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

export const createCompany = async (
  name,
  phone,
  email,
  addressId,
  workingHours
) => {
  var res = await client.post("/companies/create", {
    name,
    phone,
    email,
    addressId,
    workingHours,
  });

  return res.data;
};

export const uploadLogo = async (companyId, formData) => {
  var res = await client.post(
    `companies/upload-image?companyId=${companyId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res;
};
