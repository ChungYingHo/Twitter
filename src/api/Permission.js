import axios from "axios";

const apiURL = "https://sheltered-river-86590-4f6cb06448e2.herokuapp.com/api";

// 一般頁面
const axiosInstance = axios.create({
  baseURL: apiURL
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('UserToken')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error(error);
  },
);

export const checkPermission  = async () => {
  try {
    const res = await axiosInstance.get(`${apiURL}/auth/test-token`);
    return res.data.status
  } catch (error) {
    console.error('[Check Permission Failed]: ', error);
  }
}

// 後臺頁面
const axiosAdminInstance = axios.create({
  baseURL: apiURL
})

axiosAdminInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('AdminToken')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error(error);
  },
);


export const checkAdminPermission  = async () => {
  try {
    const res = await axiosAdminInstance.get(`${apiURL}/auth/test-token-admin`);
    return res.data.status
  } catch (error) {
    console.error('[Check Permission Failed]: ', error);
  }
}