import React from "react";
import styled from "styled-components";

const StLabel = ({ mode, children }) => {
  const Label = () => {
    switch (mode) {
      case "pr":
        return <StPrimaryLabel>{children}</StPrimaryLabel>;
      case "second":
        return <StSecondaryLabel>{children}</StSecondaryLabel>;
      default:
        return <StPrimaryLabel>{children}</StPrimaryLabel>;
    }
  };
  return <Label />;
};

export default StLabel;

export const StPrimaryLabel = styled.button`
  width: 100px;
  height: 44px;
  border-radius: 8px;
  border: none;
  background-color: ${(props) => props.theme.colors.black};
  color: white;
`;

export const StSecondaryLabel = styled.button`
  width: 100px;
  height: 44px;
  border-radius: 8px;
  border: none;
  background-color: ${(props) => props.theme.colors.gray};
  color: ${(props) => props.theme.colors.black};
  display: block;
`;
