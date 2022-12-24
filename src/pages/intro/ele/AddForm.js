import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import useInputItem from "../../../hooks/useInputItem";
import { postVideo } from "../../../redux/modules/videoSlice";
import { StButton } from "../../../UI/StIndex";

const AddForm = ({ onToggleModal }) => {
  const { input, onChangeHandler, reset } = useInputItem();
  const dispatch = useDispatch();
  const [video, setVideo] = useState();

  const formData = new FormData();
  const onSubmitHandler = (e) => {
    e.preventDefault();

    const { title, content, tag } = input;
    formData.append("title", title);
    formData.append("content", content);
    formData.append("tag", tag);
    formData.append("video", video);

    dispatch(postVideo(formData));

    onToggleModal();
    reset();
  };

  const onCloseModal = (e) => {
    e.preventDefault();
    onToggleModal();
    reset();
  };
  return (
    <StContainer>
      <label>제목</label>
      <input name="title" value={input.title} onChange={onChangeHandler} />
      <label>내용</label>
      <input name="content" value={input.content} onChange={onChangeHandler} />
      <label>영상 업로드</label>
      <input
        name="video"
        onChange={(e) => {
          setVideo(e.target.files[0]);
        }}
        type="file"
      />
      <label>태그</label>
      <input onChange={onChangeHandler} name="tag" value={input.tag} />
      <StButtonWrapper>
        <StButton onClick={onSubmitHandler}>추가하기</StButton>
        <StButton onClick={onCloseModal}>취소</StButton>
      </StButtonWrapper>
    </StContainer>
  );
};

export default AddForm;

const StContainer = styled.form`
  display: flex;
  flex-direction: column;
`;

const StButtonWrapper = styled.div`
  display: flex;
`;
