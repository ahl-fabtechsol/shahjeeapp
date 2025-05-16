import { api } from "./api";

export const getAdminDashboardData = async () =>
  api.get("/dashboard/admin").then((res) => res.data.data);

export const getBuyerDashboardData = async () =>
  api.get("/dashboard/buyer").then((res) => res.data.data);

export const getSellerDashboardData = async () =>
  api.get("/dashboard/seller").then((res) => res.data.data);

export const getHomePageData = async () =>
  api.get("/dashboard/home").then((res) => res.data);
