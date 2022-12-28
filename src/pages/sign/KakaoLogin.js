// const CLIENT_ID = process.env.REACT_APP_KAKAO_LOCAL;
// const REDIRECT_URI = "http://localhost:3000/";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { kakaoLogin } from "../../redux/modules/signSlice";

const { Kakao } = window;
const CLIENT_ID = process.env.REACT_APP_KAKAO_ID;
Kakao.init(process.env.REACT_APP_KAKAO_ID);
// console.log(Kakao.isInitialized());

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=https://jjabtube-oehq7gdnq-jungbam.vercel.app/login/kakao&response_type=code`;

const KakaoLogin = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  // Auth code
  const sendAuth = async () => {
    const code = location.search.split("=")[1];
    const res = await dispatch(kakaoLogin(code));

    if (res.meta.requestStatus === "fulfilled") {
      navigate("/");
    }
  };

  useEffect(() => {
    sendAuth();
  }, []);

  return <div>로그인 중...</div>;
};

export default KakaoLogin;
