import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { logOut } from "../redux/modules/signSlice";
import { initSearch } from "../redux/modules/videoSlice";

const Header = () => {
  const [searchValue, setSearchValue] = useState("");

  const { isLogedIn } = useSelector((state) => state.signSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const enterKeyHandler = (e) => {
    if (window.event.keyCode === 13) {
      setSearchValue("");
      navigate(`/search/${searchValue}`);
    }
  };

  const enterHandler = (e) => {
    setSearchValue("");
    navigate(`/search/${searchValue}`);
  };

  return (
    <StHeaderWrapper>
      <StHeaderContainer>
        <NavLink to="/" style={{ textDecoration: "none" }}>
          <h1 onClick={() => dispatch(initSearch())}>JJabtube</h1>
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
              <NavLink to="/signin" style={{ textDecoration: "none" }}>
                <button>로그인</button>
              </NavLink>
              <NavLink to="/signup" style={{ textDecoration: "none" }}>
                <button>회원가입</button>
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
