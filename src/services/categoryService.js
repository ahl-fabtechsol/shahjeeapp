import { api } from "@/services/api";

export const getCategories = ({ page, limit }) =>
  api.get("/category", { params: { page, limit } }).then((res) => res.data);

export const getCategory = (id) =>
  api.get(`/category/${id}`).then((res) => res.data);

export const createCategory = (payload) =>
  api.post("/category", payload).then((res) => res.data);

export const updateCategory = (id, payload) =>
  api.patch(`/category/${id}`, payload).then((res) => res.data);

export const deleteCategory = (id) =>
  api.delete(`/category/${id}`).then((res) => res.data);
