import { api } from "./api";

export const getDeals = ({ page, limit, seller, search }) =>
  api
    .get("/deals", {
      params: { page, limit, createdBy: seller, dealCode: search },
    })
    .then((res) => res.data);

export const getDeal = (id) => api.get(`/deals/${id}`).then((res) => res.data);

export const createDeal = (payload) =>
  api.post("/deals", payload).then((res) => res.data);

export const updateDeal = (id, payload) =>
  api.patch(`/deals/${id}`, payload).then((res) => res.data);

export const deleteDeal = (id) =>
  api.delete(`/deals/${id}`).then((res) => res.data);

export const getProductsForDeals = () =>
  api
    .get("/product", { params: { page: 1, limit: 1000, fields: "_id,name" } })
    .then((res) => res.data);
