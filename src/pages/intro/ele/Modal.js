import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const Modal = ({ children, modal, closeModal }) => {
  const styles = { modal };
  return (
    <>
      {ReactDOM.createPortal(
        <Fragment>
          <StModal {...styles}>
            <StModalButton onClick={closeModal}>닫기</StModalButton>
            {children}
          </StModal>
          <StBackDrop {...styles} onClick={closeModal}></StBackDrop>
        </Fragment>,
        document.getElementById("root")
      )}
    </>
  );
};

export default Modal;

const StModal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 140;
  transform: translate(-50%, -50%);
  display: ${({ modal }) => {
    return modal ? "flex" : "none";
  }};
  width: 400px;
  height: 500px;
  background-color: white;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  border-radius: 12px;
  box-shadow: 2px 2px 6px black;
`;
const StBackDrop = styled.div`
  position: fixed;
  top: 0;
  z-index: 120;
  margin: 0;
  padding: 0;
  display: ${({ modal }) => {
    return modal ? "block" : "none";
  }};
  width: 100vw;
  height: 100vh;

  background-color: rgba(141, 141, 141, 0.8);
`;

const StModalButton = styled.button`
  width: 360px;
  height: 40px;
  position: absolute;
  transform: translateY(220px);
  color: #fff;
  background-color: rgb(0, 0, 0, 0.85);
  border-radius: 5px;
  margin-left: 20px;
`;
