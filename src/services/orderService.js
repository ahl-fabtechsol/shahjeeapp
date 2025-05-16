import { api } from "./api";

export const getAllOrders = ({ page, limit, seller, search }) =>
  api
    .get("/order", { params: { page, limit, seller, orderCode: search } })
    .then((res) => res.data);

export const getOrder = (id) => api.get(`/order/${id}`).then((res) => res.data);

export const createOrder = (payload) =>
  api.post("/order", payload).then((res) => res.data);

export const updateOrder = (id, payload) =>
  api.patch(`/order/${id}`, payload).then((res) => res.data);

export const deleteOrder = (id) =>
  api.delete(`/order/${id}`).then((res) => res.data);

export const refundOrder = (id) =>
  api.post(`/order/refund/${id}`).then((res) => res.data);

export const cancelOrder = (id) =>
  api.post(`/order/cancel/${id}`).then((res) => res.data);
