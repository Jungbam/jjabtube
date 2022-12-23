import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";

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
  console.log(isLogedIn);
  return (
    <div>
      <nav></nav>
      <StSearchBox>
        <input
          placeholder="Search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyUp={enterKeyHandler}
        ></input>
        <button onClick={enterHandler}>엔터</button>
      </StSearchBox>
      <StSignBox>
        {isLogedIn ? (
          <button>로그아웃</button>
        ) : (
          <>
            <NavLink to="/signIn">
              <button>로그인</button>
            </NavLink>
            <NavLink to="/signUp">
              <button>회원가입</button>
            </NavLink>
          </>
        )}
      </StSignBox>
    </div>
  );
};

export default Header;

const StSearchBox = styled.div`
  display: flex;
`;
const StSignBox = styled.div`
  display: flex;
`;
