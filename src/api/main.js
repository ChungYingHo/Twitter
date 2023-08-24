import axios from "axios";

const apiURL = "https://sheltered-river-86590-4f6cb06448e2.herokuapp.com/api";

const axiosInstance = axios.create({
  baseURL: apiURL
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('UserToken');
    console.log(token)
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error(error);
  },
);


// 顯示全部推文
export const getTweets = async () => {
  try {
    const res = await axiosInstance.get(`${apiURL}/tweets`);
    return res.data
  } catch (error) {
    console.error('[Get Tweets failed]: ', error);
  }
}

// 顯示特定推文
export const getSingleTweet = async ({tweet_id}) => {
  try {
    const res = await axiosInstance.get(`${apiURL}/tweets/${tweet_id}`);
    return res.data
  } catch (error) {
    console.error('[Get Single Tweet failed]: ', error);
  }
}

// 顯示特定推文的全部回覆
export const getReplies = async ({tweet_id}) => {
  try {
    const res = await axiosInstance.get(`${apiURL}/tweets/${tweet_id}/replies`);
    return res.data
  } catch (error) {
    console.error('[Get Single Tweet failed]: ', error);
  }
}