// const CLIENT_ID = process.env.REACT_APP_KAKAO_LOCAL;
// const REDIRECT_URI = "http://localhost:3000/";
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { kakaoLogin } from '../../redux/modules/signSlice';

const {Kakao} = window;
const CLIENT_ID = process.env.REACT_APP_KAKAO_ID;
const REDIRECT_URI = process.env.REACT_APP_KAKAO_SERVER;

Kakao.init(process.env.REACT_APP_KAKAO_ID);
console.log(Kakao.isInitialized());

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

const KakaoLogin = () => {

  // const {response} = useParams();
  // console.log(response);
  const dispatch = useDispatch();
  const location = useLocation();

  const code = location.search.split('=')[1];

  const login = () => {
    console.log(REDIRECT_URI);
    dispatch(kakaoLogin(code));
  }

  
  return (
    <button onClick={login}>계속하기
    </button>
  );
}

export default KakaoLogin;