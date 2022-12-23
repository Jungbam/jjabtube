import React,{useState} from "react";
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import StButton from './../../UI/StButton';

const SignIn = () => {

  const [input, setInput] = useState({
    email: "",
    password: "",
  })

  const ChangeInputHandler = (e) => {
    const { name, value } = e.target;
    setInput({...input, [name]: value});
  }
  console.log(input);

  return (
  <StWrapper>
    <StForm>
      <h2>로그인</h2>
      <StInputContainer>
        <StFormInput placeholder='이메일' name='email' onChange={ChangeInputHandler}></StFormInput>
        <StFormInput placeholder='비밀번호' name='password' type="password" onChange={ChangeInputHandler}></StFormInput>
      </StInputContainer>
      <StBtnContainer>
        <StButton mode={"pr"}>로그인</StButton>
        <Link to ='/signup'>
          <StButton mode={"second"}>회원가입</StButton>
        </Link>
      </StBtnContainer>
    </StForm>
  </StWrapper>);
};

const StWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;  
`;

const StInputContainer = styled.div`
  margin: 38px 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const StBtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const StForm = styled.form`
  margin: 0 auto;
  width: 448px;
  height: 500px;
  border: 1px solid ${props => props.theme.colors.gray};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StFormInput = styled.input`
  width: 320px;
  height: 56px;
  color: ${props => props.theme.colors.black};
  border: 1px solid ${props => props.theme.colors.gray};
  border-radius: 5px;
  padding-left: 10px;
  &:focus {
    outline: 2px solid ${props => props.theme.colors.blue};
  }
  ::placeholder{
    color: ${props => props.theme.colors.gray};
  }
`;

export default SignIn;
