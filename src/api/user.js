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

// get user data
export const getUser = async () => {
  try {
    const userId = localStorage.getItem("userID");
    if (!userId) {
      throw Error("no user ID");
    }
    const res = await axiosInstance.get(`${apiURL}/users/${userId}`);
    return res.data;
  } catch (error) {
    console.error("[Get User failed]: ", error);
  }
};

// 更改user data
export const editUser = async ({ name, introduction }) => {
  const userId = localStorage.getItem("userID");
  try {
    const res = await axiosInstance.put(`${apiURL}/users/${userId}`, {
      name,
      introduction,
    });
    return res.data;
  } catch (error) {
    console.error("[Edit User in UserPage failed]: ", error);
  }
};

//  獲取user推文
export const getUserTweets = async () => {
  try {
    const userId = localStorage.getItem("userID");

    const res = await axiosInstance.get(`${apiURL}/users/${userId}/tweets`);
    return res.data;
  } catch (error) {
    console.error("[Get UserTweets failed]: ", error);
  }
};

export const getUserReplies = async () => {
  try {
    const userId = localStorage.getItem("userID");

    const res = await axiosInstance.get(
      `${apiURL}/users/${userId}/replied_tweets`
    );
    return res.data;
  } catch (error) {
    console.error("[Get UserReplies failed]: ", error);
  }
};

export const getUserLikes = async () => {
  try {
    const userId = localStorage.getItem("userID");

    const res = await axiosInstance.get(`${apiURL}/users/${userId}/likes`);
    return res.data;
  } catch (error) {
    console.error("[Get UserLikes failed]: ", error);
  }
};

export const getUserFollowings = async () => {
  try {
    const userId = localStorage.getItem("userID");

    const res = await axiosInstance.get(`${apiURL}/users/${userId}/followings`);
    return res.data;
  } catch (error) {
    console.error("[Get Userfollowings failed]: ", error);
  }
};

export const getUserFollowers = async () => {
  try {
    const userId = localStorage.getItem("userID");

    const res = await axiosInstance.get(`${apiURL}/users/${userId}/followers`);
    return res.data;
  } catch (error) {
    console.error("[Get UserFollowerss failed]: ", error);
  }
};
