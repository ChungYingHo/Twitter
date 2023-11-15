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

// 顯示全部推文
export const getTweets = async () => {
  try {
    const res = await axiosInstance.get(`/tweets`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

// 顯示特定推文
export const getSingleTweet = async ({ tweet_id }) => {
  try {
    const res = await axiosInstance.get(`/tweets/${tweet_id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

// 顯示特定推文的全部回覆
export const getReplies = async ({ tweet_id }) => {
  try {
    const res = await axiosInstance.get(`/tweets/${tweet_id}/replies`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

// 新增貼文
export const postTweets = async ({ description }) => {
  try {
    const res = await axiosInstance.post(`/tweets`, {
      description,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

// 新增回覆
export const postReply = async ({ tweet_id, comment }) => {
  try {
    const res = await axiosInstance.post(`/tweets/${tweet_id}/replies`, {
      comment,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

// 喜愛這篇貼文
export const likeTweet = async ({ tweet_id }) => {
  try {
    const res = await axiosInstance.post(`/tweets/${tweet_id}/like`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

// 取消喜愛這篇貼文
export const dislikeTweet = async ({ tweet_id }) => {
  try {
    const res = await axiosInstance.post(`/tweets/${tweet_id}/unlike`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
