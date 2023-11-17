import axios from "axios";

const apiURL =
  "http://twitter-api-dev2.ap-northeast-1.elasticbeanstalk.com/api";

export const login = async ({ account, password }) => {
  try {
    const res = await axios.post(`${apiURL}/users/signin`, {
      account,
      password,
    });

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
    throw error;
  }
};

export const register = async ({
  name,
  account,
  email,
  password,
  checkPassword,
}) => {
  try {
    const res = await axios.post(`${apiURL}/users`, {
      name,
      account,
      email,
      password,
      checkPassword,
    });

    if (!res || !res.data) {
      throw Error("nothing returned");
    }

    if (res.status >= 400 || res.data.status !== "success") {
      throw Error("request has error");
    }

    const userData = res.data.data?.user;

    if (!userData) {
      throw Error("no user data");
    }

    return { success: true };
  } catch (error) {
    throw error;
  }
};
