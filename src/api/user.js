import axios from "axios";

const apiURL = "https://sheltered-river-86590-4f6cb06448e2.herokuapp.com/api";

const userId = localStorage.getItem("userID");

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

// get user data
export const getUser = async () => {
  try {
    console.log({ userId });
    const res = await axiosInstance.get(`${apiURL}/users/${userId}`);
    return res.data;
  } catch (error) {
    console.error("[Get User failed]: ", error);
  }
};

//  獲取user推文
export const getUserTweets = async () => {
  try {
    const res = await axiosInstance.get(`${apiURL}/users/${userId}/tweets`);
    return res.data;
  } catch (error) {
    console.error("[Get User failed]: ", error);
  }
};
