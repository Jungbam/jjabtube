import React, { useState } from "react";
import ReactPlayer from "react-player";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Player = ({ video }) => {
  const [play, setPlay] = useState(false);

  return (
    <StPlayerAll>
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
          <h1>{video.title}</h1>
        </NavLink>

        <h1>작성자 : {video.nickname}</h1>
        <h1>등록일자 : {video.createdAt}</h1>
        <h1>조회수 : {video.view}</h1>
      </StContainerCol>
    </StPlayerAll>
  );
};

const StPlayerAll = styled.div`
  width: 300px;
  &:hover {
    transform: scale(1.2);
    z-index: 20;
  }
`;

const StPlyerContainer = styled.div`
  border-radius: 12px;
  width: 300px;
  height: 200px;
  box-shadow: 0 0 6px #333;
  overflow: hidden;
`;

const StThumbnail = styled.img``;
const StContainerCol = styled.div`
  display: flex;
  flex-direction: column;
`;

export default Player;
