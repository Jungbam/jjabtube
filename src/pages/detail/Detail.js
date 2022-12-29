import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
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
    tag: "",
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
    setUpdating(false);
    setUpdatement({
      title: "",
      content: "",
      tag: "",
      comment: "",
    });
  };
  const postCommentHandler = () => {
    dispatch(postComment({ comment: updatement.comment, postId: videoId }));
  };
  return (
    <section>
      {detailVideo && (
        <>
          <StTotalContainer>
            <StPlayerContainer>
              <ReactPlayer
                className="react-player"
                url={detailVideo?.origVid}
                height="100%"
                width="100%"
                playing={true}
                muted={true}
                controls={true}
              />
            </StPlayerContainer>
            <StVideoInfo>
              <StProfile src={detailVideo?.profile} alt={detailVideo?.title} />
              <StInfoBox>
                <StH1>{detailVideo?.title}</StH1>
                <p>{detailVideo?.nickname}</p>
                <p>{detailVideo?.updatedAt}</p>
              </StInfoBox>
              <StInfoContent>
                <StContent>{detailVideo?.content}</StContent>
                <StTag># {detailVideo?.tag}</StTag>
              </StInfoContent>
            </StVideoInfo>
            {isLogedIn && (
              <StButtonBox>
                {updating ? (
                  <StUpdateBox>
                    <label>제목</label>
                    <input
                      type="text"
                      value={updatement.title}
                      onChange={onChangUpdatament}
                      name="title"
                      placeholder="제목"
                    />
                    <label>내용</label>
                    <input
                      type="text"
                      value={updatement.content}
                      onChange={onChangUpdatament}
                      name="content"
                      placeholder="내용"
                    />
                    <label>태그</label>
                    <input
                      type="text"
                      value={updatement.tag}
                      onChange={onChangUpdatament}
                      name="tag"
                      placeholder="태그"
                    />
                    <StButton mode="smpr" onClick={onPatchHandler}>
                      완료
                    </StButton>
                  </StUpdateBox>
                ) : (
                  <StUpdateBox>
                    <StButton mode="smpr" onClick={onDeleteHandler}>
                      삭제
                    </StButton>
                    <StButton mode="smpr" onClick={() => setUpdating(true)}>
                      수정
                    </StButton>
                  </StUpdateBox>
                )}
              </StButtonBox>
            )}
          </StTotalContainer>
          <StCommentBox>
            <button onClick={() => SetOpenComment((prev) => !prev)}>
              {openComment ? "댓글 닫기" : "댓글 보기"}
            </button>
            {openComment && (
              <>
                <StCommentInput>
                  <StInput
                    type="text"
                    value={updatement.comment}
                    name="comment"
                    onChange={onChangUpdatament}
                  ></StInput>
                  <StCommentBtn onClick={postCommentHandler}>작성</StCommentBtn>
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
          </StCommentBox>
        </>
      )}
    </section>
  );
};

export default Detail;

const StTotalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StPlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: black;
  border-radius: 12px;
  overflow: hidden;
  width: 80%;
  height: 600px;
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
const StH1 = styled.p`
  width: 150px;
  font-size: 24px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const StProfile = styled.img`
  background-color: white;
  width: 70px;
  height: 70px;
  border-radius: 35px;
`;
const StInfoContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding: 20px;
  width: 80%;
  height: 150px;
  border-radius: 3px;
  background-color: #ccc;
`;
const StCommentInput = styled.div`
  display: flex;
  width: 80%;
  margin: 0 auto;
  margin-bottom: 20px;
`;

const StInput = styled.input`
  margin-right: 10px;
  width: 60%;
`;
const StButtonBox = styled.div`
  width: 100px;
  display: flex;
  justify-content: center;
  gap: 10px;
  width: 80%;
  margin: 0 auto;
`;

const StCommentBtn = styled.button`
  width: 60px;
  height: 30px;
`;

const StCommentContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  border: 1px solid #ccc;
  border-radius: 12px;
`;
const StCommentBox = styled.div`
  width: 80%;
  margin: 0 auto;
`;
const StUpdateBox = styled.div``;
const StContent = styled.p`
  width: 100%;
  font-size: 1em;
  line-height: 2rem;
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;
const StTag = styled.p`
  width: 100%;
  font-size: 1.2em;
  font-weight: 600;
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;
