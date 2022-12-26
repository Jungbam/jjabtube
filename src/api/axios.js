import axios from "axios";
import { Cookies } from "react-cookie";

const cookie = new Cookies();

export const client = axios.create({
  baseURL: process.env.REACT_APP_SERVER,
});

// 토큰 심어보내기
client.interceptors.request.use(
  function (config) {
    console.log("나갈 때", config);
    config.headers.authorization = `Bearer ${cookie.get("token")}`;
    return config;
  },
  function (error) {
    return error;
  }
);

// 토큰 검증, 토큰 쿠키 심기
client.interceptors.response.use(
  function (response) {
    console.log("들어올때", response);
    if (response.data.token) {
      const token = response.data.token;
      cookie.set("token", token);
    }

    return response;
  },
  function (error) {
    if (error?.response.status === 401) {
      cookie.remove("token");
      return error;
    }
    return error;
  }
);
