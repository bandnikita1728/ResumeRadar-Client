import api from "./api";

export const sendMessage = async (payload) => {
  const { data } = await api.post("/chat/message", payload);
  return data;
};

export const getSessions = async () => {
  const { data } = await api.get("/chat/sessions");
  return data;
};
