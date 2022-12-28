import React, { useState } from "react";
import ReactPlayer from "react-player";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

//업로드 날짜, 정렬기준 (버튼으로 )
// 버튼을 누르면 컴포넌트 숨어져있다가 보여져야 한다

const SearchPost = ({ video }) => {
  const [play, setPlay] = useState(false);

  return (
    <div>
      <StWrapAll>
        <StPlyerContainer
          onMouseEnter={() => setPlay(true)}
          onMouseLeave={() => setPlay(false)}
        >
          {!play ? (
            <StThumbnail src={video.thumbnail} alt={video.title} />
          ) : (
            <ReactPlayer
              className="react-player"
              url={video.compVid}
              width="100%"
              height="100%"
              playing={true}
              muted={true}
              controls={true}
            />
          )}
        </StPlyerContainer>
        <StContainerCol>
          <NavLink
            to={`/detail/${video.postId}`}
            style={{ textDecoration: "none" }}
          >
            <StTitle>{video.title}</StTitle>
          </NavLink>

          <StBoxRow>
            <StView>조회수 : {video.view}</StView>
            <StCreatedAt>등록일자 : {video.createdAt}</StCreatedAt>
            <StNickname>작성자 : {video.nickname}</StNickname>
            <StContent>{video.content}</StContent>
          </StBoxRow>
        </StContainerCol>
      </StWrapAll>
    </div>
  );
};

export default SearchPost;

const StWrapAll = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StPlyerContainer = styled.div`
  border-radius: 12px;
  width: 300px;
  height: 200px;
  box-shadow: 0 0 6px #333;
  overflow: hidden;
  margin: 20px 10px;
`;
const StBoxRow = styled.div`
  display: border;
`;
const StThumbnail = styled.img``;
const StContainerCol = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 20px;
`;

const StTitle = styled.h1`
  font-size: 1.8rem;
`;

const StView = styled.p`
  font-size: 1rem;
`;

const StCreatedAt = styled.p`
  font-size: 1rem;
`;

const StNickname = styled.p`
  font-size: 1rem;
  padding-bottom: 10px;
`;

const StContent = styled.p``;
