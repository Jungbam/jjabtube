import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import {
  deleteVideo,
  getDetailVideo,
  patchVideo,
} from "../../redux/modules/videoSlice";
import StButton from "../../UI/StButton";
import Comment from "./el/Comment";

const commentList = [
  { comment: "hi", commentId: "hh" },
  { comment: "hi", commentId: "hh" },
  { comment: "hi", commentId: "hh" },
  { comment: "hi", commentId: "hh" },
  { comment: "hi", commentId: "hh" },
  { comment: "hi", commentId: "hh" },
  { comment: "hi", commentId: "hh" },
  { comment: "hi", commentId: "hh" },
  { comment: "hi", commentId: "hh" },
  { comment: "hi", commentId: "hh" },
  { comment: "hi", commentId: "hh" },
  { comment: "hi", commentId: "hh" },
  { comment: "hi", commentId: "hh" },
];

const Detail = () => {
  const { isLogedIn } = useSelector((state) => state.signSlice);
  const detailVideo = useSelector((state) => state.videoSlice.detailViedeo);
  const { videoId } = useParams();
  const [openComment, SetOpenComment] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [updatement, setUpdatement] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getDetailVideo(videoId));
    setUpdatement(detailVideo?.content ?? "");
  }, []);

  const onDeleteHandler = () => {
    dispatch(deleteVideo(videoId));
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };
  const onPatchHandler = () => {
    dispatch(patchVideo({ videoId, updatement }));
  };
  return (
    <section>
      {detailVideo && (
        <>
          <StPlayerContainer>
            <video controls width="100%" height="100%" autoPlay>
              <source src={detailVideo?.origVid} type="video/mp4" />
            </video>
          </StPlayerContainer>
          <StVideoInfo>
            <StProfile src={detailVideo?.profile} alt={detailVideo?.title} />
            <StInfoBox>
              <h1>{detailVideo?.title}</h1>
              <p>{detailVideo?.nickname}</p>
              <p>{detailVideo?.updatedAt}</p>
            </StInfoBox>
            <StInfoContent>
              <p>{detailVideo?.content}</p>
            </StInfoContent>
          </StVideoInfo>
          {isLogedIn && (
            <>
              {updating ? (
                <>
                  <input
                    type="text"
                    value={updatement}
                    onChange={(e) => {
                      setUpdatement(e.target.value);
                    }}
                  />
                  <StButton mode="smpr" onClick={onPatchHandler}>
                    완료
                  </StButton>
                </>
              ) : (
                <>
                  <StButton mode="smpr" onClick={onDeleteHandler}>
                    삭제
                  </StButton>
                  <StButton mode="smpr" onClick={() => setUpdating(true)}>
                    수정
                  </StButton>
                </>
              )}
            </>
          )}

          <button onClick={() => SetOpenComment((prev) => !prev)}>
            {openComment ? "댓글 닫기" : "댓글 보기"}
          </button>
          {openComment && (
            <StCommentContainer>
              {commentList?.map((el, i) => {
                return (
                  <Comment
                    key={`comment${el?.commentId}${i}`}
                    el={el}
                  ></Comment>
                );
              })}
            </StCommentContainer>
          )}
        </>
      )}
    </section>
  );
};

export default Detail;

const StPlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 600px;
  padding: 40px;
  margin: 0 auto;
`;
const StVideoInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 auto;
  width: 80%;
  gap: 20px;
`;
const StInfoBox = styled.div`
  display: flex;
  flex-direction: column;
`;
const StProfile = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 35px;
`;
const StInfoContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 80%;
  height: 70px;
  border-radius: 12px;
  background-color: #ccc;
`;
const StCommentContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  border: 1px solid #ccc;
  border-radius: 12px;
`;
