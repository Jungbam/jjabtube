
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Player from "../../components/Player";
import { getAllVideo, searchTag } from "../../redux/modules/videoSlice";
import { StButton, StLabel } from "../../UI/StIndex";
import AddForm from "./ele/AddForm";
import Modal from "./ele/Modal";

const Intro = () => {
  const { allVideos } = useSelector((state) => state.videoSlice);
  const { isLogedIn } = useSelector((state) => state.signSlice);
  const [modal, setModal] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllVideo());
  }, []);

  const onToggleModal = () => {
    setModal((prev) => !prev);
  };

  const searchByTagHandler = (e) => {
    dispatch(searchTag(e.target.value));
  };

  return (
    <section>
      <article>
        <StLabel onClick={searchByTagHandler} name="축구">
          축구
        </StLabel>
        <StLabel onClick={searchByTagHandler} name="Lol">
          LoL
        </StLabel>
        <StLabel onClick={searchByTagHandler} name="운동">
          운동
        </StLabel>
        <StLabel onClick={searchByTagHandler} name="패션">
          패션
        </StLabel>
      </article>
      {isLogedIn && (
        <StButton mode="smpr" onClick={onToggleModal}>
          +
        </StButton>
      )}
      {isLogedIn && (
        <Modal modal={modal} closeModal={onToggleModal}>
          <AddForm onToggleModal={onToggleModal}></AddForm>
        </Modal>
      )}
      <StAllVideoContainer>
        {allVideos.map((video) => {
          return <Player key={`player${video.postId}`} video={video} />;
        })}
      </StAllVideoContainer>
    </section>

  );
};

export default Intro;

const StAllVideoContainer = styled.div`
  width: 90%;
  margin: 0 auto;
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

