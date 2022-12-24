import React,{useState, useEffect ,useRef} from "react";
import styled from 'styled-components';
import StButton from './../../UI/StButton';
import profile from '../../assets/profile.png';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signUp, dupEmailCheck } from './../../redux/modules/signSlice';
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

  const __dupEmailCheck = (e) => {
    e.preventDefault();
    dispatch(dupEmailCheck(input.email));
  }
  
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();

    for (const property in input){
      formData.append(`${property}`, input[property]);
    }

    // Profile 이미지 처리 백엔드 완성되면 
    // formData.append("profileImg", profileImg);
    // console.log(formData.get('profileImg'));

    for (const pair of formData.entries()) {
      console.log(`${pair[0]}, ${pair[1]}`);
    }
    
    dispatch(signUp(formData));
  }

  return (
  <Wrapper>
    <StDiv>
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
          <StDupCheckButton onClick={__dupEmailCheck}>중복체크</StDupCheckButton>
        </StBtnContainer>
        <StFormInput placeholder='닉네임' name='nickname' onChange={ChangeInputHandler}></StFormInput>
        <StFormInput autoComplete='off' placeholder='비밀번호' name='password' type="password" onChange={ChangeInputHandler}></StFormInput>
        <StFormInput autoComplete='off' placeholder='비밀번호 확인' name='passwordConfirm' type="password" onChange={ChangeInputHandler}></StFormInput>
      </InputContainer>
      {/* 버튼 수정 */}
      <StPrimaryLgButton onClick={onSubmitHandler}>회원가입</StPrimaryLgButton>
    </StDiv>
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

const StDiv = styled.div`
  margin: 0 auto;
  width: 448px;
  height: 600px;
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
  background-color: ${(props) => props.theme.colors.blue};
  border: none;
  border-radius: 0 5px 5px 0;
`;

const StPrimaryLgButton = styled.button`
  width: 320px;
  height: 60px;
  color: white;
  border: none;
  border-radius: 5px;
  background-color: ${(props) => props.theme.colors.blue};
`;

export default SignUp;
