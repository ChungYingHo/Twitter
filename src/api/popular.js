import axios from "axios";

const apiURL = "https://simple-twitter-zmso.onrender.com/api";

const axiosInstance = axios.create({
  baseURL: apiURL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("UserToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    throw error;
  }
);

// 顯示推薦追隨
export const getPopUsers = async () => {
  try {
    const res = await axiosInstance.get(`${apiURL}/users/top`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

// 跟隨
export const followUser = async ({ id }) => {
  try {
    const res = await axiosInstance.post(`${apiURL}/followships`, {
      id,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

// 取消跟隨
export const disFollowUser = async ({ followingId }) => {
  try {
    const res = await axiosInstance.delete(
      `${apiURL}/followships/${followingId}`,
      {
        followingId,
      }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};
