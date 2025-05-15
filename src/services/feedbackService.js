import { api } from "./api";

export const getFeedbacks = ({ page, limit, search }) =>
  api
    .get("/feedback", { params: { page, limit, name: search } })
    .then((res) => res.data);

export const getFeedback = (id) =>
  api.get(`/feedback/${id}`).then((res) => res.data);

export const createFeedback = (payload) =>
  api.post("/feedback", payload).then((res) => res.data);

export const updateFeedback = (id, payload) =>
  api.patch(`/feedback/${id}`, payload).then((res) => res.data);

export const deleteFeedback = (id) =>
  api.delete(`/feedback/${id}`).then((res) => res.data);

export const replyFeedback = (id, payload) =>
  api.post(`/feedback/reply/${id}`, payload).then((res) => res.data);


export const featureFeedback = (id, payload) =>
  api.post(`/feedback/feature/${id}`, payload).then((res) => res.data);