import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { logOut } from "../redux/modules/signSlice";
import { initSearch } from "../redux/modules/videoSlice";
import youtube from '../assets/youtube.png';

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
        <NavLink to="/" style={{ textDecoration: "none", gap: "4px  ", alignItems: "center", display:"flex"}}>
          <StIcon src={youtube} alt="icon"/>
          <StH3 onClick={() => dispatch(initSearch())}>JJabtube</StH3>
        </NavLink>

        <StSearchBox>
          <StInput
            type="text"
            placeholder="검색"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyUp={enterKeyHandler}
          ></StInput>
          <StSearchBtn onClick={enterHandler}>검색</StSearchBtn>
        </StSearchBox>
        <StSignBox>
          {isLogedIn ? (
            <StSmButton onClick={() => dispatch(logOut())}>로그아웃</StSmButton>
          ) : (
            <>
              <NavLink to="/signin" style={{ textDecoration: "none" }}>
                <StSmButton>로그인</StSmButton>
              </NavLink>
              <NavLink to="/signup" style={{ textDecoration: "none" }}>
                <StSmButton>회원가입</StSmButton>
              </NavLink>
            </>
          )}
        </StSignBox>
      </StHeaderContainer>
    </StHeaderWrapper>
  );
};

export default Header;

const StHeaderWrapper = styled.header`
  position: fixed;
  width: 100%;
  height: 56px;
  align-items: center;
  top: 0;
  display: flex;
  justify-content: center;
  background-color: white;
`;
const StHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;  
  justify-content: space-between;
  width: 90%;
`;

const StH3 = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: black;
  font-family: "Heycomic";
`;

const StIcon = styled.img`
  width: 32px;
  height: 32px;
`;
const StSearchBox = styled.div`
  display: flex;
  justify-content: center;
  width: 40%;
  border: 1px solid ${(props) => props.theme.colors.gray};
  border-radius: 30px 30px 30px 30px;
`;

const StInput = styled.input`
  width: 100%;
  height: 2.5rem;
  border: none;
  background-color:transparent;
  padding-left: 15px;
  &:focus {
    box-shadow: 1px ${(props) => props.theme.colors.blue} inset;
    border-radius: 30px 0 0 30px;
  }
`;

const StSearchBtn = styled.button`
  height: 40px;
  width: 64px;
  border: transparent;
  border-radius: 0 40px 40px 0;
  &:hover {
    background: rgb(220, 220, 220);
  }
`;

const StSmButton = styled.button`
  width: 70px;
  height: 40px;
  border-radius: 30%;
  border: 1px solid ${(props) => props.theme.colors.gray};
  &:hover {
    background: rgb(220, 220, 220);
  }
`;

const StSignBox = styled.div`
  display: flex;
  gap: 5px;
`;
