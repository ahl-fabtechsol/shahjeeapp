import { api } from "./api";

export const getSliders = async () =>
  await api.get("/slider").then((res) => res.data);

export const createSlider = async (data) =>
  await api.post("/slider", data).then((res) => res.data);

export const deleteSlider = async (id) =>
  await api.delete(`/slider/${id}`).then((res) => res.data);

export const updateSlider = async (id, data) =>
  await api.patch(`/slider/${id}`, data).then((res) => res.data);
