import api from "./api";

export const uploadResume = async (file) => {
  const formData = new FormData();
  formData.append("resume", file);
  const { data } = await api.post("/resume/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const getResumes = async () => {
  const { data } = await api.get("/resume");
  return data;
};

export const getResumeById = async (id) => {
  const { data } = await api.get(`/resume/${id}`);
  return data;
};

export const analyzeResume = async (id, payload) => {
  const { data } = await api.post(`/resume/${id}/analyze`, payload);
  return data;
};

export const improveResume = async (id, payload) => {
  const { data } = await api.post(`/resume/${id}/improve`, payload);
  return data;
};

export const tailorResume = async (id, jobDescriptionText) => {
  const { data } = await api.post(`/resume/${id}/tailor`, { jobDescriptionText });
  return data;
};

export const deleteResume = async (id) => {
  const { data } = await api.delete(`/resume/${id}`);
  return data;
};
