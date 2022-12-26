import React from "react";
import styled from "styled-components";

const StButton = ({ mode, children, onClick }) => {
  const Button = () => {
    switch (mode) {
      case "pr":
        return (
          <StPrimaryLgButton onClick={onClick}>{children}</StPrimaryLgButton>
        );
      case "second":
        return (
          <StSecondaryLgButton onClick={onClick}>
            {children}
          </StSecondaryLgButton>
        );
      case "smpr":
        return (
          <StPrimarySmButton onClick={onClick}>{children}</StPrimarySmButton>
        );
      case "smsecond":
        return (
          <StSecondarySmButton onClick={onClick}>
            {children}
          </StSecondarySmButton>
        );
      default:
        return (
          <StPrimaryLgButton onClick={onClick}>{children}</StPrimaryLgButton>
        );
    }
  };

  return <Button />;
};

export default StButton;
StButton.defaultProps = {
  onClick: () => {},
};
const StPrimaryLgButton = styled.button`
  width: 320px;
  height: 60px;
  color: white;
  border: none;
  border-radius: 5px;
  background-color: ${(props) => props.theme.colors.blue};
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
