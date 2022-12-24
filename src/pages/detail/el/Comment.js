import React from "react";
import styled from "styled-components";

const Comment = ({ el }) => {
  return (
    <StWrapper>
      <StP>{el.commentId}</StP>
      <StP>{el.comment}</StP>
    </StWrapper>
  );
};

export default Comment;

const StWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StP = styled.p`
  height: 2rem;
  box-shadow: 0px 0px 3px #eee;
  border: none;
  border-bottom: 1px solid #ccc;
  width: 40%;
  margin: 0 auto;
  filter: blur(0.5px);
  &:hover {
    transform: scale(1.01);
    filter: blur(0);
  }
`;
