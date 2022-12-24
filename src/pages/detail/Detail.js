import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getDetailVideo } from "../../redux/modules/videoSlice";
import Comment from "./el/Comment";

const commentList = [
  { coment: "hi" },
  { coment: "hi" },
  { coment: "hi" },
  { coment: "hi" },
  { coment: "hi" },
  { coment: "hi" },
  { coment: "hi" },
  { coment: "hi" },
  { coment: "hi" },
  { coment: "hi" },
  { coment: "hi" },
  { coment: "hi" },
  { coment: "hi" },
];

const Detail = () => {
  const { videoId } = useParams();
  const dispatch = useDispatch();
  const [openComment, SetOpenComment] = useState(false);
  const detailVideo = useSelector((state) => state.videoSlice.detailViedeo);
  useEffect(() => {
    dispatch(getDetailVideo(videoId));
  }, []);

  return (
    <section>
      {detailVideo && (
        <>
          <StPlayerContainer>
            <ReactPlayer
              url={detailVideo.origVid}
              poster=""
              width="100%"
              height="100%"
              playing={true}
              muted={true}
              controls={true}
              light={false}
              pip={true}
            />
          </StPlayerContainer>
          <StVideoInfo>
            <StProfile src={detailVideo.profile} alt={detailVideo.title} />
            <StInfoBox>
              <h1>{detailVideo.title}</h1>
              <p>{detailVideo.nickname}</p>
              <p>{detailVideo.updatedAt}</p>
            </StInfoBox>
            <StInfoContent>
              <p>{detailVideo.content}</p>
            </StInfoContent>
          </StVideoInfo>
          <button onClick={() => SetOpenComment((prev) => !prev)}>
            {openComment ? "댓글 닫기" : "댓글 보기"}
          </button>
          {openComment && (
            <StCommentContainer>
              {commentList.map((el) => {
                return <Comment>{el.coment}</Comment>;
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
