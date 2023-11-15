import axios from "axios";

const apiURL =
  "http://twitter-api-dev2.ap-northeast-1.elasticbeanstalk.com/api";

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

// get user data
export const getUser = async (userId) => {
  try {
    const userIdRequest = userId || localStorage.getItem("userID");
    if (!userIdRequest) {
      throw Error("no user ID");
    }
    const res = await axiosInstance.get(`/users/${userIdRequest}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

// 更改user data
export const editUser = async ({
  name,
  introduction,
  banner,
  avatar,
  account,
  email,
  password,
  checkPassword,
}) => {
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
  account && formData.append("account", account);
  email && formData.append("email", email);
  password && formData.append("password", password);
  checkPassword && formData.append("checkPassword", checkPassword);

  try {
    const res = await axiosInstance.put(`/users/${userId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

//  獲取user推文
export const getUserTweets = async (userId) => {
  try {
    const userIdRequest = userId || localStorage.getItem("userID");

    const res = await axiosInstance.get(`/users/${userIdRequest}/tweets`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

// 獲取user回覆
export const getUserReplies = async (userId) => {
  try {
    const userIdRequest = userId || localStorage.getItem("userID");

    const res = await axiosInstance.get(
      `/users/${userIdRequest}/replied_tweets`
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

// 獲取user喜歡貼文
export const getUserLikes = async (userId) => {
  try {
    const userIdRequest = userId || localStorage.getItem("userID");

    const res = await axiosInstance.get(`/users/${userIdRequest}/likes`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

// 獲取user正在追蹤
export const getUserFollowings = async (userId) => {
  try {
    const userIdRequest = userId || localStorage.getItem("userID");

    const res = await axiosInstance.get(`/users/${userIdRequest}/followings`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

// 獲取user的追隨者
export const getUserFollowers = async (userId) => {
  try {
    const userIdRequest = userId || localStorage.getItem("userID");

    const res = await axiosInstance.get(`/users/${userIdRequest}/followers`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
