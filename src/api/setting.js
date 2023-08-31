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

// 取得使用者資訊
export const getUser = async (id) => {
  try {
    const res = await axiosInstance.get(`${apiURL}/users/${id}`);
    return res.data;
  } catch (error) {
    console.error("[Get User failed]: ", error);
  }
};

// 更改使用者資訊
export const editUser = async ({
  id,
  name,
  account,
  email,
  password,
  checkPassword,
}) => {
  try {
    console.log("edit");
    const res = await axiosInstance.put(`${apiURL}/users/${id}`, {
      id,
      name,
      account,
      email,
      password,
      checkPassword,
    });
    return res.data;
  } catch (error) {
    console.error("[Edit User failed]: ", error);
    throw error
  }
};
