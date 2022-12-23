import React from "react";
import ReactPlayer from "react-player";
import styled from "styled-components";

const Player = ({ playUrl, thumnail, width, height }) => {
  const style = { width, height };
  return (
    <>
      <StPlyerContainer {...style}>
        <ReactPlayer
          url={playUrl ?? null}
          poster={thumnail ?? null}
          width="100%"
          height="100%"
          playing={false}
          muted={true}
          controls={true}
          light={false}
          pip={true}
          style
        />
      </StPlyerContainer>
      <StContainerCol>
        <h1>제목</h1>
        <h1>내용</h1>
        <h1>조회수</h1>
        <h1>createAt</h1>
      </StContainerCol>
    </>
  );
};

Player.defaultProps = {
  width: "300px",
  height: "200px",
};
const StPlyerContainer = styled.div`
  border-radius: 12px;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  box-shadow: 0 0 6px #333;
  overflow: hidden;
  &:hover {
    transform: scale(1.2);
  }
`;
const StContainerCol = styled.div`
  display: flex;
  flex-direction: column;
`;

export default Player;
