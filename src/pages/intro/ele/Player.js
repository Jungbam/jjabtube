import React, { useState } from "react";
import ReactPlayer from "react-player";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Player = ({ video }) => {
  const [play, setPlay] = useState(false);
  console.log(video);
  return (
    <StPlayerAll>
      <NavLink
        to={`/detail/${video.postId}`}
        style={{ textDecoration: "none", color: 'black' }}
      >
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
      <StContainerRow>
        <StProfileImgDiv>
          <img
            alt="profile"
            src="data:image/jpeg;base64,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"
            width="32px"
            height="32px"
            border-radius= "50%"
            object-fit="cover"
          />
        </StProfileImgDiv>
        <StContainerCol>
          <StTitle>{video.title}</StTitle>
          <StNickName>작성자 : {video.nickname}</StNickName>
          <StCreateAt>등록일자 : {video.createdAt}</StCreateAt>
          <StViewCount>조회수 : {video.view}</StViewCount>
        </StContainerCol>
      </StContainerRow>
      </NavLink>
    </StPlayerAll>
  );
};

const StPlayerAll = styled.div`
  background: white;
  &:hover {
    z-index: 20;
    transform: scale(1.3);
    box-shadow: 0 0 3px #333;
    border-radius: 12px;
  }
`;

const StPlyerContainer = styled.div`
  background: black;
  height: 180px;
  border-radius: 12px 12px 0 0;
  overflow: hidden;
`;

const StThumbnail = styled.img`
  object-fit: cover;
`;

const StProfileImgDiv = styled.div`
  width: 40px;
  height: 32px;
  margin: 10px 10px 0 10px;
  border-radius: 50%;
  overflow: hidden;
`;

const StContainerCol = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 8px;
  width: 100%;
`;

const StContainerRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const StTitle = styled.div`
  font-weight: 600;
  font-size: 18px;
  padding: 5px 0;
`;

const StNickName = styled.div`

`;

const StCreateAt = styled.div`

`;

const StViewCount = styled.div`

`;
export default Player;
