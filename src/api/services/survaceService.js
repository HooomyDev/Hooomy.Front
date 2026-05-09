import { apiClient as client } from "../client";

export const getSurvays = async (
  page = 1,
  pageSize = 10,
  status = 0,
  type = 0,
  title = "",
  companyId = ""
) => {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
      title: title ?? null,
      status: status ?? null,
      type: type ?? null,
      companyId: companyId ?? "",
    });

    const res = await client.get(`/polls?${params}`);

    const data = res.data;

    return data;
  } catch (e) {
    console.error(e);
  }
};

export const getSurvayDetails = async (surveyId) => {
  const res = await client.get(`/polls/${surveyId}`);

  return res.data;
};

export const submitSurvayAnswer = async (surveyId, answerData) => {
  try {
    console.log(answerData);
    const res = await client.post(`/polls/${surveyId}/vote`, answerData);
    return res.data;
  } catch (e) {
    console.error(e);
  }
};

export const createSurvay = async (
  title,
  description = "",
  companyId = "",
  type = 0,
  options = []
) => {
  const survay = {
    title: title,
    description: description,
    companyId: companyId,
    type: type,
    options: options,
  };

  console.log(survay);

  const res = await client.post("/polls/create", survay);

  return res.data;
};

export const deleteSurvay = async (id) => {
  var res = await client.delete(`/polls/delete/${id}`);

  return res.data;
};

export const updateSurvay = async (id, data) => {
  const body = {
    id: id,
    title: data.title,
    description: data.description,
    status: data.status,
  };
  const res = await client.put(`/polls/update`, body);

  return res.data;
};
