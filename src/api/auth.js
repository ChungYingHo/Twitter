import axios from "axios";

const apiURL = "https://sheltered-river-86590-4f6cb06448e2.herokuapp.com/api";

export const login = async ({ account, password }) => {
  try {
    const { data } = await axios.post(`${apiURL}/users/signin`, {
      account,
      password,
    });

    console.log(data);

    const { token } = data;
    if (token) {
      return { success: true, ...data };
    }

    return { success: false, data, error: "token not found" };
  } catch (error) {
    console.error("[Login Failed]:", error);
    return { success: false, error: "login fail" };
  }
};
