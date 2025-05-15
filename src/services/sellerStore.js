import { api } from "./api";
export const getSellerStores = ({ page, limit, seller, search }) =>
  api
    .get("/seller-store", { params: { page, limit, seller, name: search } })
    .then((res) => res.data);

export const getSellerStore = (id) =>
  api.get(`/seller-store/${id}`).then((res) => res.data);

export const createSellerStore = (payload) =>
  api.post("/seller-store", payload).then((res) => res.data);

export const updateSellerStore = (id, payload) =>
  api.patch(`/seller-store/${id}`, payload).then((res) => res.data);

export const deleteSellerStore = (id) =>
  api.delete(`/seller-store/${id}`).then((res) => res.data);
