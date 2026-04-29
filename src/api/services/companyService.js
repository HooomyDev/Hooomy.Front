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

export const getCompanyEmployees = async (companyId) => {
  const res = await client.get(`companies/${companyId}/employees`);
  return res.data.employees ?? [];
};

export const addAddressToCompany = async (companyId, addressId) => {
  const res = await client.put(
    `/companies/${companyId}/add-address/${addressId}`
  );
  return res.data;
};

export const deleteCompany = async (id) => {
  const res = await client.delete(`/companies/delete/${id}`);
  return res.data;
};

export const updateCompany = async (data) => {
  const res = await client.put("/companies/update", data);
  return res.data;
};

export const removeAddressFromCompany = async (companyId, addressId) => {
  console.log(addressId);
  const res = await client.put(
    `/companies/${companyId}/remove-address/${addressId}`
  );
  return res.data;
};
