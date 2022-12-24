import React, { useState } from "react";
import ReactPlayer from "react-player";
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
            url={video.compVid ?? null}
            poster={video.thumbnail ?? null}
            width="100%"
            height="100%"
            playing={true}
            muted={true}
            controls={true}
            light={false}
            pip={true}
          />
        )}
      </StPlyerContainer>
      <StContainerCol>
        <h1>{video.title}</h1>
        <h1>작성자 : {video.nickname}</h1>
        <h1>등록일자 : {video.createdAt}</h1>
      </StContainerCol>
    </StPlayerAll>
  );
};

const StPlayerAll = styled.div`
  width: 300px;
`;

const StPlyerContainer = styled.div`
  border-radius: 12px;
  width: 300px;
  height: 200px;
  box-shadow: 0 0 6px #333;
  overflow: hidden;
  &:hover {
    transform: scale(1.2);
  }
`;

const StThumbnail = styled.img``;
const StContainerCol = styled.div`
  display: flex;
  flex-direction: column;
`;

export default Player;
