import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Error404 from "../pages/404/Error404";
import Detail from "../pages/detail/Detail";
import Intro from "../pages/intro/Intro";
import Live from "../pages/live/Live";
import SignIn from "../pages/sign/SignIn";
import SignUp from "../pages/sign/SignUp";
import KakaoLogin from "../pages/sign/KakaoLogin";
import StFixBox from "../UI/StFixBox";
import Post from "../pages/post/Post";

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <StFixBox />
        <StBox>
          <Routes>
            <Route path="/" element={<Intro />} />
            <Route path="/post" element={<Post />} />
            <Route path="/detail/:videoId" element={<Detail />} />
            <Route path="/live" element={<Live />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login/kakao" element={<KakaoLogin />} />
            <Route path="/*" element={<Error404 />} />
          </Routes>
        </StBox>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default Router;
const StBox = styled.div`
  height: 90vh;
`;
