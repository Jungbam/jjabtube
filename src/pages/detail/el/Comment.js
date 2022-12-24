import React from "react";
import styled from "styled-components";

const Comment = ({ children }) => {
  return <StP>{children}</StP>;
};

export default Comment;

const StP = styled.p`
  height: 2rem;
  box-shadow: 0px 0px 3px #eee;
  border: none;
  border-bottom: 1px solid #ccc;
  width: 80%;
  margin: 0 auto;
  filter: blur(0.5px);
  &:hover {
    transform: scale(1.01);
    filter: blur(0);
  }
`;
