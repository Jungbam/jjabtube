import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { postComment } from "../../redux/modules/commentSlice";
import {
  deleteVideo,
  getDetailVideo,
  patchVideo,
} from "../../redux/modules/videoSlice";
import StButton from "../../UI/StButton";
import Comment from "./el/Comment";

const Detail = () => {
  const { isLogedIn } = useSelector((state) => state.signSlice);
  const detailVideo = useSelector((state) => state.videoSlice.detailViedeo);
  const { videoId } = useParams();
  const [openComment, SetOpenComment] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [updatement, setUpdatement] = useState({
    title: "",
    content: "",
    tage: "",
    comment: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const commentList = detailVideo?.comments;

  const onChangUpdatament = (e) => {
    const { name, value } = e.target;
    setUpdatement({ ...updatement, [name]: value });
  };

  useEffect(() => {
    dispatch(getDetailVideo(videoId));
    setUpdatement({
      title: detailVideo?.title ?? "",
      tag: detailVideo?.tag ?? "",
      content: detailVideo?.content ?? "",
      comment: "",
    });
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
  //comment 부분
  const postCommentHandler = () => {
    dispatch(postComment({ comment: updatement.comment, postId: videoId }));
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
                    value={updatement.title}
                    onChange={onChangUpdatament}
                    name="title"
                  />
                  <input
                    type="text"
                    value={updatement.content}
                    onChange={onChangUpdatament}
                    name="content"
                  />
                  <input
                    type="text"
                    value={updatement.tag}
                    onChange={onChangUpdatament}
                    name="tag"
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
            <>
              <StCommentInput>
                <input
                  type="text"
                  value={updatement.comment}
                  name="comment"
                  onChange={onChangUpdatament}
                ></input>
                <button onClick={postCommentHandler}>작성</button>
              </StCommentInput>
              <StCommentContainer>
                {commentList?.map((el, i) => {
                  return (
                    <Comment
                      key={`comment${el?.commentId}${i}`}
                      el={el}
                      videoId={videoId}
                    ></Comment>
                  );
                })}
              </StCommentContainer>
            </>
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
const StCommentInput = styled.div`
  display: flex;
  width: 80%;
  margin: 0 auto;
`;
const StCommentContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  border: 1px solid #ccc;
  border-radius: 12px;
`;
