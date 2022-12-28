import axios from "axios";
import { Cookies } from "react-cookie";

const cookie = new Cookies();

export const client = axios.create({
  baseURL: process.env.REACT_APP_SERVER,
});

client.interceptors.request.use(
  function (config) {
    if (cookie.get("token")) {
      config.headers.authorization = `Bearer ${cookie.get("token")}`;
    }
    return config;
  },
  function (error) {
    return error;
  }
);

client.interceptors.response.use(
  function (response) {
    if (response.data.token) {
      cookie.set("token", response.data.token, { path: "/" });
    }
    return response;
  },

  function (error) {
    if (error?.response.status === 401) {
      cookie.remove("token", { path: "/" });
      return error;
    }
    return error;
  }
);
