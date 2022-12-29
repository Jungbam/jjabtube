import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import {
  deleteComment,
  patchComment,
} from "../../../redux/modules/commentSlice";

const Comment = ({ el, videoId }) => {
  const [updating, setUpdating] = useState();
  const dispatch = useDispatch();
  const [upComment, setUpComment] = useState("");
  return (
    <StWrapper>
      <StContentWrap>
        <StNickname>{el.nickname}</StNickname>
        <StcreatedAt>{el.createdAt}</StcreatedAt>
        {updating ? (
          <StInput
            type="text"
            value={upComment}
            onChange={(e) => setUpComment(e.target.value)}
            placeholder="수정할 내용을 입력하세요"
          ></StInput>
        ) : (
          <StComment>{el.comment}</StComment>
        )}
      </StContentWrap>
      <StBtnWrap>
        {updating ? (
          <StBtn
            onClick={() => {
              dispatch(
                patchComment({
                  postId: videoId,
                  commentId: el.commentId,
                  comment: upComment,
                })
              );
              setUpdating(false);
            }}
          >
            완료
          </StBtn>
        ) : (
          <StBtn
            onClick={() => {
              setUpdating(true);
            }}
          >
            수정
          </StBtn>
        )}
        <StBtn
          onClick={() => {
            dispatch(
              deleteComment({ postId: videoId, commentId: el.commentId })
            );
          }}
        >
          삭제
        </StBtn>
      </StBtnWrap>
    </StWrapper>
  );
};

export default Comment;

const StWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StContentWrap = styled.div`
  padding: 10px;
`;

const StNickname = styled.p`
  font-size: 20px;
  font-weight: 600;
  height: 2rem;
  border: none;
  width: 40%;
  margin: 0 auto;
`;

const StComment = styled.p`
  font-size: 15px;
  width: 100px;
  height: 20px;
  margin-bottom: 20px;
  margin-left: 20px;
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const StInput = styled.input`
  width: 200px;
  height: 20px;
  margin-left: 20px;
`;

const StcreatedAt = styled.p`
  font-size: 13px;
  height: 20px;
  margin-left: 35px;
`;

const StBtnWrap = styled.div`
  padding-right: 30px;
`;

const StBtn = styled.button`
  width: 60px;
  height: 30px;
  margin-top: 25px;

  &:hover {
    transform: scale(1.01);
    filter: blur(0);
  }
`;
