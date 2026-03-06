import api from "./api";

export const getJobRecommendations = async (resumeId, filters = {}) => {
  const params = new URLSearchParams();
  if (resumeId) params.append("resumeId", resumeId);
  if (filters.type) params.append("type", filters.type);
  const { data } = await api.get(`/jobs/recommendations?${params.toString()}`);
  return data;
};
