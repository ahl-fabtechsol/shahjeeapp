import { api } from "./api";

export const getAllUsers = ({ page, limit, userStatus }) =>
  api
    .get("/user", { params: { page, limit, status: userStatus } })
    .then((res) => res.data);

export const getUser = (id) =>
  api.get(`/user/${id}`).then((res) => res.data.user);

export const createUser = (payload) =>
  api.post("/user/signup", payload).then((res) => res.data);

export const updateUser = (id, payload) =>
  api.patch(`/user/${id}`, payload).then((res) => res.data);

export const deleteUser = (id) =>
  api.delete(`/user/${id}`).then((res) => res.data);

export const resetPassword = (id, payload) =>
  api.patch(`/user/adminResetPassword/${id}`, payload).then((res) => res.data);
