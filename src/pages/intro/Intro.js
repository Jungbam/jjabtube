import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Player from "./ele/Player";
import { getAllVideo, searchTag } from "../../redux/modules/videoSlice";
import { StButton, StLabel } from "../../UI/StIndex";
import AddForm from "./ele/AddForm";
import Modal from "./ele/Modal";

const Intro = () => {
  const { allVideos, searchedVideo } = useSelector((state) => state.videoSlice);
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
    dispatch(searchTag(e.target.name));
  };

  return (
    <section>
      <article>
        <StLabel onClick={searchByTagHandler} name="cat">
          cat
        </StLabel>
        <StLabel onClick={searchByTagHandler} name="pet">
          pet
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
        {searchedVideo === null ? (
          allVideos?.map((video) => {
            return <Player key={`player${video.postId}`} video={video} />;
          })
        ) : (
          <></>
        )}
        {searchedVideo?.length === 0 ? (
          <p>검색결과가 없습니다.</p>
        ) : (
          searchedVideo?.map((video) => {
            return <Player key={`player${video.postId}`} video={video} />;
          })
        )}
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
