import axios from "axios";

const apiURL = "https://sheltered-river-86590-4f6cb06448e2.herokuapp.com/api";

const userId = localStorage.getItem("userID");

const axiosInstance = axios.create({
  baseURL: apiURL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("UserToken");
    // console.log(token);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error(error);
  }
);

// 獲取user資料
export const getUser = async () => {
  try {
    const res = await axiosInstance.get(`${apiURL}/users/${userId}`);
    return res.data;
  } catch (error) {
    console.error("[Get User failed]: ", error);
  }
};

// 編輯user資料
export const patchUser = async (payload) => {
  const { name, introduction, avator, banner } = payload;
  try {
    const res = await axiosInstance.patch(`${apiURL}/users/${userId}`, {
      name,
      introduction,
      avator,
      banner,
    });
    return res.data;
  } catch (error) {
    console.error("[Patch User failed]: ", error);
  }
};
