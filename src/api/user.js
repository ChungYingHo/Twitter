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
export const getUser = async (userId) => {
  try {
    const userIdRequest = userId || localStorage.getItem("userID");
    if (!userIdRequest) {
      throw Error("no user ID");
    }
    const res = await axiosInstance.get(`${apiURL}/users/${userIdRequest}`);
    return res.data;
  } catch (error) {
    console.error("[Get User failed]: ", error);
  }
};

// 更改user data
export const editUser = async ({ name, introduction, banner, avatar }) => {
  const userId = localStorage.getItem("userID");

  let formData = new FormData();
  if (name) {
    formData.append("name", name);
  }
  if (introduction) {
    formData.append("introduction", introduction);
  }
  if (banner) {
    formData.append("banner", banner);
  }
  if (avatar) {
    formData.append("avatar", avatar);
  }

  try {
    const res = await axiosInstance.put(`${apiURL}/users/${userId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    console.error("[Edit User in UserPage failed]: ", error);
  }
};

//  獲取user推文
export const getUserTweets = async (userId) => {
  try {
    const userIdRequest = userId || localStorage.getItem("userID");

    const res = await axiosInstance.get(
      `${apiURL}/users/${userIdRequest}/tweets`
    );
    return res.data;
  } catch (error) {
    console.error("[Get UserTweets failed]: ", error);
  }
};

// 獲取user回覆
export const getUserReplies = async (userId) => {
  try {
    const userIdRequest = userId || localStorage.getItem("userID");

    const res = await axiosInstance.get(
      `${apiURL}/users/${userIdRequest}/replied_tweets`
    );
    return res.data;
  } catch (error) {
    console.error("[Get UserReplies failed]: ", error);
  }
};

// 獲取user喜歡貼文
export const getUserLikes = async (userId) => {
  try {
    const userIdRequest = userId || localStorage.getItem("userID");

    const res = await axiosInstance.get(
      `${apiURL}/users/${userIdRequest}/likes`
    );
    return res.data;
  } catch (error) {
    console.error("[Get UserLikes failed]: ", error);
  }
};

// 獲取user正在追蹤
export const getUserFollowings = async (userId) => {
  try {
    const userIdRequest = userId || localStorage.getItem("userID");

    const res = await axiosInstance.get(
      `${apiURL}/users/${userIdRequest}/followings`
    );
    return res.data;
  } catch (error) {
    console.error("[Get Userfollowings failed]: ", error);
  }
};

// 獲取user的追隨者
export const getUserFollowers = async (userId) => {
  try {
    const userIdRequest = userId || localStorage.getItem("userID");

    const res = await axiosInstance.get(
      `${apiURL}/users/${userIdRequest}/followers`
    );
    return res.data;
  } catch (error) {
    console.error("[Get UserFollowerss failed]: ", error);
  }
};
