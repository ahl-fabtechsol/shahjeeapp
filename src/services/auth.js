import { api } from "./api";

export const signupAPI = (data) =>
  api.post("/user/signup", data).then((r) => r.data);
export const loginAPI = (data) =>
  api.post("/user/login", data).then((r) => r.data);
export const forgotPasswordAPI = ({ email }) =>
  api.post("/user/forgotPassword", { email }).then((r) => r.data);
export const verifyOtpAPI = ({ email, otp }) =>
  api
    .post("/user/verifyResetCode", { email, resetCode: otp })
    .then((r) => r.data);
export const resetPasswordAPI = ({ email, password, otp }) =>
  api
    .post("/user/resetPassword", {
      email,
      newPassword: password,
      resetCode: otp,
    })
    .then((r) => r.data);
export const refreshTokenAPI = (refreshToken) =>
  api.post("/user/refreshToken", { refreshToken }).then((r) => r.data);
