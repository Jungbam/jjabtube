import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Player from "../../components/Player";
import { getAllVideo } from "../../redux/modules/videoSlice";
import { StLabel } from "../../UI/StIndex";

const Intro = () => {
  const { allVideos } = useSelector((state) => state.videoSlice);
  console.log(allVideos);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllVideo());
  }, []);

  return (
    <section>
      <article>
        <StLabel>축구</StLabel>
        <StLabel>LoL</StLabel>
        <StLabel>운동</StLabel>
        <StLabel>패션</StLabel>
      </article>
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
