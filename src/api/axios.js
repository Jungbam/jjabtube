import axios from "axios";
import { Cookies } from "react-cookie";

const cookie = new Cookies();


export const client = axios.create({
  baseURL: process.env.REACT_APP_SERVER,
});

export const AuthAPI = {
  // login: (pay)
}

// 토큰 심어보내기
client.interceptors.request.use(
  function (config) {
    if(cookie.get("token") !== undefined){
      config.headers.authorization = `Bearer ${cookie.get("token")}`;
    }
    return config;
  },
  function (error) {
    return error;
  }
);

// 토큰 검증, 토큰 쿠키 심기
client.interceptors.response.use(
  function (response) {
    if(response.data.token){
      const token = response.data.token;
      console.log(token);
      // 쿠키 유효시간
      const expires = new Date();
      expires.setMinutes(expires.getMinutes()+60);
      cookie.set("token", token, {expires});
    }
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
