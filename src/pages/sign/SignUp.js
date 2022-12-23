import React,{useState, useEffect ,useRef} from "react";
import styled from 'styled-components';
import StButton from './../../UI/StButton';
import profile from '../../assets/profile.png';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { __signUp, __dupEmailCheck } from './../../redux/modules/signSlice';
import { useSelector } from 'react-redux';

const SignUp = () => {

  const [profileImg, setProfileImg] = useState({});
  const [previewImg, setPreviewImg] = useState("");
  const [input, setInput] = useState({
    email: "",
    nickname: "",
    password: "",
    passwordConfirm: "",
  })
  const {dupCheck, isSignUp} = useSelector((state) => state.signSlice);
  const dispatch = useDispatch();
  const imgRef = useRef();  
  const navigate = useNavigate();

  const ChangeInputHandler = (e) => {
    const { name, value } = e.target;
    setInput({...input, [name]: value});
  }

  const ChangeImgHandler = (e) => {
    const profileImg = e.target.files[0];

    // 이미지 미리보기
    const file = imgRef.current.files[0];
    const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreviewImg(reader.result);
    };
    setProfileImg(profileImg);
  }

  const dupEmailCheck = () => {
    dispatch(__dupEmailCheck(input.email));
  }
  
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();

    for (const property in input){
      formData.append(`${property}`, input[property]);
    }
    formData.append("profileImg", profileImg);
    dispatch(__signUp(formData));
  }

  useEffect(() => {
    if(isSignUp){
      alert("회원가입 성공");
      navigate("/signin");
    }
  }, [isSignUp]);

  return (
  <Wrapper>
    <StForm onSubmit={onSubmitHandler}>
      <h2>회원가입</h2>
      <InputContainer>
        <StImgDiv>
          <img
            alt="profile"
            src={previewImg ? previewImg : profile}
            width="32px"
            height="32px"
            border-radius= "50%"
            object-fit="cover"
          />
        </StImgDiv>
        <StImgLabel htmlFor="profileImg">프로필 이미지 추가</StImgLabel>  
          <StImgInput 
            id="profileImg"
            ref={imgRef}
            accept="image/*"
            name='profileImg'
            type='file'
            onChange={ChangeImgHandler}/>
        <StBtnContainer>
          <StFormInput placeholder='이메일' name='email' onChange={ChangeInputHandler}></StFormInput>
          <StDupCheckButton onClick={dupEmailCheck}>중복체크</StDupCheckButton>
        </StBtnContainer>
        <StFormInput placeholder='닉네임' name='nickname' onChange={ChangeInputHandler}></StFormInput>
        <StFormInput autoComplete='off' placeholder='비밀번호' name='password' type="password" onChange={ChangeInputHandler}></StFormInput>
        <StFormInput autoComplete='off' placeholder='비밀번호 확인' name='passwordConfirm' type="password" onChange={ChangeInputHandler}></StFormInput>
        
      </InputContainer>
      <StButton mode={"pr"}>회원가입</StButton>
    </StForm>
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
  align-items: center;  
  gap: 14px;
`;

const StForm = styled.form`
  margin: 0 auto;
  width: 448px;
  height: 700px;
  border: 1px solid #D1D1D1;
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
  &:focus { outline: 2px solid ${props => props.theme.colors.blue}; }
  ::placeholder{ color: ${props => props.theme.colors.gray}; }
`;

const StImgInput = styled.input`
  display: none;
`;

const StImgDiv = styled.div`
  width: 32px;
  height: 32px; 
  border-radius: 70%;
  overflow: hidden;
`;

const StImgLabel = styled.label`
  padding:5px;
  font-weight: bold;
  font-size: 14px;
  color: #0095f6;
  display: inline-block;
  cursor: pointer;
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
