import { apiClient as client } from "../client";

export const getSurvays = async (page = 1, pageSize = 10, filter = "all") => {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
      filter: filter,
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

export const submitSurveyAnswer = async (surveyId, answerData) => {
  try {
    console.log(answerData);
    const res = await client.post(`/polls/${surveyId}/vote`, answerData);
    return res.data;
  } catch (e) {
    console.error(e);
  }
};
