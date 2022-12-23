import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { logOut } from "../redux/modules/signSlice";

const Header = () => {
  const [searchValue, setSearchValue] = useState("");

  const { isLogedIn } = useSelector((state) => state.signSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const enterKeyHandler = (e) => {
    if (window.event.keyCode === 13) {
      dispatch(); // 엔터 쳤을 때 요청
      setSearchValue("");
      navigate("/");
    }
  };

  const enterHandler = (e) => {
    dispatch(); // 엔터 버튼 눌렀을 때 요청
    setSearchValue("");
    navigate("/");
  };

  return (
    <StHeaderWrapper>
      <StHeaderContainer>
        <NavLink to="/signIn" style={{ textDecoration: "none" }}>
          <h1>JJabtube</h1>
        </NavLink>
        <StSearchBox>
          <StInput
            type="text"
            placeholder="Search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyUp={enterKeyHandler}
          ></StInput>
          <button onClick={enterHandler}>엔터</button>
        </StSearchBox>

        <StSignBox>
          {isLogedIn ? (
            <button onClick={() => dispatch(logOut())}>로그아웃</button>
          ) : (
            <>
              <NavLink to="/signIn" style={{ textDecoration: "none" }}>
                <button onClick={() => {}}>로그인</button>
              </NavLink>
              <NavLink to="/signUp" style={{ textDecoration: "none" }}>
                <button onClick={() => {}}>회원가입</button>
              </NavLink>
            </>
          )}
        </StSignBox>
      </StHeaderContainer>
    </StHeaderWrapper>
  );
};

export default Header;

const StHeaderWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 70px;
  align-items: center;
  top: 0;
  display: flex;
  justify-content: center;
  background-color: rgba(229, 232, 232, 0.9);
  font-family: "EF_jejudoldam";
`;
const StHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
`;
const StInput = styled.input`
  height: 2.5rem;
`;
const StSearchBox = styled.div`
  display: flex;
`;
const StSignBox = styled.div`
  display: flex;
`;
