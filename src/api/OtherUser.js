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
export const getOtherUser = async ({ id }) => {
  try {
    const res = await axiosInstance.get(`${apiURL}/users/${id}`);
    return res.data;
  } catch (error) {
    console.error("[Get Other User by Id failed]: ", error);
  }
};

//  獲取user推文
export const getUserTweets = async ({ id }) => {
  try {
    const res = await axiosInstance.get(`${apiURL}/users/${id}/tweets`);
    return res.data;
  } catch (error) {
    console.error("[Get UserTweets failed]: ", error);
  }
};

// 獲取user回覆
export const getUserReplies = async ({ id }) => {
  try {
    const res = await axiosInstance.get(`${apiURL}/users/${id}/replied_tweets`);
    return res.data;
  } catch (error) {
    console.error("[Get UserReplies failed]: ", error);
  }
};

// 獲取user喜歡貼文
export const getUserLikes = async ({ id }) => {
  try {
    const res = await axiosInstance.get(`${apiURL}/users/${id}/likes`);
    return res.data;
  } catch (error) {
    console.error("[Get UserLikes failed]: ", error);
  }
};

// 獲取user正在追蹤
export const getUserFollowings = async ({ id }) => {
  try {
    const res = await axiosInstance.get(`${apiURL}/users/${id}/followings`);
    return res.data;
  } catch (error) {
    console.error("[Get Userfollowings failed]: ", error);
  }
};

// 獲取user的追隨者
export const getUserFollowers = async ({ id }) => {
  try {
    const res = await axiosInstance.get(`${apiURL}/users/${id}/followers`);
    return res.data;
  } catch (error) {
    console.error("[Get UserFollowerss failed]: ", error);
  }
};
