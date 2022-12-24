import axios from "axios";
import { Cookies } from "react-cookie";

const cookie = new Cookies();

export const client = axios.create({
  baseURL: process.env.REACT_APP_SERVER,
});

// 토큰 심어보내기
client.interceptors.request.use(
  function (config) {
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
    const token = response.headers.get("token");
    cookie.set("token", token);

    console.log("itcpt res ", response);
    return response;
  },
  function (error) {

    if (error?.response.status === 401) {
      cookie.remove("token");
      return error;
    }

    console.log("itcpt err ", error.response.data.errorMessage);
    return error;
  }
);
