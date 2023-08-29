import axios from "axios";

const apiURL = "https://sheltered-river-86590-4f6cb06448e2.herokuapp.com/api";

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
    console.error(error);
  }
);

// 拿特定user資料
export const getUser = async ({ id }) => {
  try {
    const res = await axiosInstance.get(`${apiURL}/users/${id}`);
    return res.data;
  } catch (error) {
    console.error("[Get Other User by Id failed]: ", error);
  }
};
