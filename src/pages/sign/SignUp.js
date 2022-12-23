import React,{useState} from "react";
import styled from 'styled-components';
import StButton from './../../UI/StButton';
import { useDispatch } from 'react-redux';
import { signUp } from './../../redux/modules/signSlice';
import e from 'express';

const SignUp = () => {

  const [input, setInput] = useState({
    email: "",
    nickname: "",
    password: "",
    passwordConfirm: "",
  })
  const dispatch = useDispatch();

  const ChangeInputHandler = (e) => {
    const { name, value } = e.target;
    setInput({...input, [name]: value});
  }

  const onSubmitHandler = (e) => {
    // dispatch(signUp(input));
  }

  return (
  <Wrapper>
    <Form>
      <h2>회원가입</h2>
      <InputContainer>
        <StBtnContainer>
          <FormInput placeholder='이메일' name='email' onChange={ChangeInputHandler}></FormInput>
          <StDupCheckButton>중복체크</StDupCheckButton>
        </StBtnContainer>
        <FormInput placeholder='닉네임' name='nickname' onChange={ChangeInputHandler}></FormInput>
        <FormInput placeholder='비밀번호' name='password' type="password" onChange={ChangeInputHandler}></FormInput>
        <FormInput placeholder='비밀번호 확인' name='passwordConfirm' type="password" onChange={ChangeInputHandler}></FormInput>
      </InputContainer>
      <StButton mode={"pr"}>회원가입</StButton>
    </Form>
  </Wrapper>);
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;  
`;

const InputContainer = styled.div`
  margin: 38px 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const Form = styled.form`
  margin: 0 auto;
  width: 448px;
  height: 500px;
  border: 1px solid #D1D1D1;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FormInput = styled.input`
  width: 320px;
  height: 56px;
  color: ${props => props.theme.colors.black};
  border: 1px solid ${props => props.theme.colors.gray};
  border-radius: 5px;
  padding-left: 10px;
  type: password;
  &:focus { outline: 2px solid ${props => props.theme.colors.blue}; }
  ::placeholder{ color: ${props => props.theme.colors.gray}; }
`;

const StBtnContainer = styled.div`
  width:320px;
  position: relative;
`;

const StDupCheckButton = styled.button`
  position: absolute;
  right: 0;
  width: 65px;
  height: 56px;
  color: white;
  background-color: ${(props) => props.theme.colors.gray};
  border: none;
  border-radius: 0 5px 5px 0;
`;

export default SignUp;
