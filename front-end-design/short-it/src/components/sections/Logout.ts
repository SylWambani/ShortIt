import axiosInstance from "../api/axiosInstance";

export const logout = () => {
  // 1. Remove stored tokens
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");

  // 2. Remove Authorization header
  delete axiosInstance.defaults.headers.common["Authorization"];

  // 3. Optional: clear cached user data
  localStorage.removeItem("user");
};
