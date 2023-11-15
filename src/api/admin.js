import axios from "axios";

const apiURL =
  "http://twitter-api-dev2.ap-northeast-1.elasticbeanstalk.com/api";

// 登入後台
export const adminLogin = async ({ account, password }) => {
  try {
    const res = await axios.post(`${apiURL}/admin/signin`, {
      account,
      password,
    });
    // 檢查是否有 res 物件回傳以及 data 是否存在
    if (!res || !res.data) {
      throw Error("nothing returned");
    }

    if (res.status >= 400 || res.data.status !== "success") {
      throw Error("request has error");
    }

    const adminData = res.data.data?.user;
    const adminToken = res.data.data?.token;

    if (!adminData) {
      throw Error("no user data");
    }
    if (!adminToken) {
      throw Error("no user token");
    }

    return { success: true, adminData, adminToken };
  } catch (error) {
    throw error;
  }
};

// 後臺操作部分
const axiosInstance = axios.create({
  baseURL: apiURL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("AdminToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    throw error;
  }
);

// 顯示全部貼文
export const adminGetTweets = async () => {
  try {
    const res = await axiosInstance.get(`/admin/tweets`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

// 顯示全部使用者
export const adminGetUsers = async () => {
  try {
    const res = await axiosInstance.get(`/admin/users`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

// 刪除特定貼文
export const adminDeleteTweet = async ({ id }) => {
  try {
    const res = await axiosInstance.delete(`/admin/tweets/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
