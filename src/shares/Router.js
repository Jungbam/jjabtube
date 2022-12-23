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
import StFixBox from "../UI/StFixBox";

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <StFixBox />
        <StBox>
          <Routes>
            <Route path="/" element={<Intro />} />
            <Route path="/detail/:videoId" element={<Detail />} />
            <Route path="/live" element={<Live />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
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
  min-height: 90vh;
`;
