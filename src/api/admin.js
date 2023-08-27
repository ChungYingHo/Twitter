import axios from "axios";

const apiURL = "https://sheltered-river-86590-4f6cb06448e2.herokuapp.com/api";

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
    console.error("[Login Failed]:", error);
    return {
      success: false,
      errorMessage: error?.message,
    };
  }
}

// 後臺操作部分
const axiosInstance = axios.create({
  baseURL: apiURL
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('AdminToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error(error);
  },
);

// 顯示全部貼文
export const adminGetTweets = async () => {
  try {
    const res = await axiosInstance.get(`${apiURL}/admin/tweets`);
    return res.data
  } catch (error) {
    console.error('[Admin get Tweets failed]: ', error);
  }
}

// 顯示全部使用者
export const adminGetUsers = async () => {
  try {
    const res = await axiosInstance.get(`${apiURL}/admin/users`);
    return res.data
  } catch (error) {
    console.error('[Admin get Users failed]: ', error);
  }
}

// 刪除特定貼文
export const adminDeleteTweet = async ({id}) => {
  try {
    const res = await axiosInstance.delete(`${apiURL}/admin/tweets/${id}`);
    return res.data
  } catch (error) {
    console.error('[Admin delete Users failed]: ', error);
  }
}