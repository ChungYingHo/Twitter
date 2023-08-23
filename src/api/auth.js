import axios from "axios";

const apiURL = "https://sheltered-river-86590-4f6cb06448e2.herokuapp.com/api";

export const login = async ({ account, password }) => {
  try {
    const res = await axios.post(`${apiURL}/users/signin`, {
      account,
      password,
    });

    console.log(res);

    if (!res || !res.data) {
      throw Error("nothing returned");
    }

    if (res.status >= 400 || res.data.status !== "success") {
      throw Error("request has error");
    }

    const userData = res.data.data?.user;
    const userToken = res.data.data?.token;

    if (!userData) {
      throw Error("no user data");
    }
    if (!userToken) {
      throw Error("no user token");
    }

    return { success: true, userData, userToken };
  } catch (error) {
    console.error("[Login Failed]:", error);
    return {
      success: false,
      errorMessage: error?.message,
    };
  }
};
