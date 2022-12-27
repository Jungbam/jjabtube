import React from "react";
import styled from "styled-components";

const Intro = () => {
  return (
    <>
      <button>label 1</button>
      <button>label 2</button>
      <button>label 3</button>
      <StContainer>
        <StWrap1>
          <StVideo></StVideo>
          <StWrap2>
            <StTitle>TITLE</StTitle>
            <StView>22</StView>
            <StNickname>SajoChamchi</StNickname>
          </StWrap2>
        </StWrap1>
      </StContainer>
    </>
  );
};

export default Intro;

const StContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const StWrap1 = styled.div`
  width: 300px;
  overflow: hidden;
`;

const StVideo = styled.div`
  border: 2px solid blue;
  border-radius: 15px;
  width: 17rem;
  height: 170px;
  overflow: auto;
  display: flex;
  align-items: center;
  margin: 3%;
`;

const StWrap2 = styled.div`
  width: 100%;
`;

const StTitle = styled.div`
  font-size: 1.3rem;
  font-weight: 500;
`;

const StView = styled.div`
  font-size: 1rem;
  font-weight: 500;
`;

const StNickname = styled.div`
  font-size: 1rem;
  font-weight: 500;
`;
