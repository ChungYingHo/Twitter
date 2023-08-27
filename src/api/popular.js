import axios from "axios";

const apiURL = "https://sheltered-river-86590-4f6cb06448e2.herokuapp.com/api";

const axiosInstance = axios.create({
  baseURL: apiURL
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('UserToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error(error);
  },
);

// 顯示推薦追隨
export const getPopUsers = async () => {
  try {
    const res = await axiosInstance.get(`${apiURL}/users/top`)
    return res.data
  } catch (error) {
    console.error('[Get Users failed]: ', error)
    throw error
  }
}

// 跟隨
export const followUser = async ({id}) => {
  try {
    const res = await axiosInstance.post(`${apiURL}/followships`,{
      id
    });
    return res.data
  } catch (error) {
    console.error('[Follow User failed]: ', error);
    throw error
  }
}


// 取消跟隨
export const disFollowUser = async ({followingId}) => {
  try {
    const res = await axiosInstance.delete(`${apiURL}/followships/${followingId}`,{
      followingId
    });
    return res.data
  } catch (error) {
    console.error('[DisFollow User failed]: ', error);
    throw error
  }
}