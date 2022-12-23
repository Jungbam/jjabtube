import React from "react";
import styled from "styled-components";

const StButton = ({ mode, children }) => {
  const Button = () => {
    switch (mode) {
      case "pr":
        return <StPrimaryLgButton>{children}</StPrimaryLgButton>;
      case "second":
        return <StSecondaryLgButton>{children}</StSecondaryLgButton>;
      case "smpr":
        return <StPrimarySmButton>{children}</StPrimarySmButton>;
      case "smsecond":
        return <StSecondarySmButton>{children}</StSecondarySmButton>;
      default:
        return <StPrimaryLgButton>{children}</StPrimaryLgButton>;
    }
  };

  return <Button />;
};

export default StButton;

const StPrimaryLgButton = styled.button`
  width: 320px;
  height: 60px;
  color: white;
  border: none;
  border-radius: 5px;
  background-color: ${(props) => props.theme.colors.red};
`;

const StSecondaryLgButton = styled.button`
  width: 320px;
  height: 60px;
  color: ${(props) => props.theme.colors.black};
  background-color: white;
  border: 1px solid ${(props) => props.theme.colors.black};
  border-radius: 5px;
`;

const StPrimarySmButton = styled.button`
  width: 100px;
  height: 50px;
  color: white;
  background-color: ${(props) => props.theme.colors.black};
  border: 1px solid ${(props) => props.theme.colors.black};
  border-radius: 5px;
`;

const StSecondarySmButton = styled.button`
  width: 100px;
  height: 50px;
  color: ${(props) => props.theme.colors.black};
  background-color: white;
  border: 1px solid ${(props) => props.theme.colors.black};
  border-radius: 5px;
`;
