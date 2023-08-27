import axios from "axios";

const apiURL = "https://sheltered-river-86590-4f6cb06448e2.herokuapp.com/api";
const userId = localStorage.getItem('userID')

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

// 取得使用者資訊
export const getUser = async () => {
  try {
    const res = await axiosInstance.get(`${apiURL}/users/${userId}`);
    return res.data
  } catch (error) {
    console.error('[Get User failed]: ', error);
  }
}

// 更改使用者資訊
export const editUser = async ({name, account, email, password, checkPassword}) => {
  try {
    const res = await axiosInstance.put(`${apiURL}/users/${userId}`, {
        name,
        account,
        email,
        password,
        checkPassword
    });
    return res.data
  } catch (error) {
    console.error('[Edit User failed]: ', error);
  }
}