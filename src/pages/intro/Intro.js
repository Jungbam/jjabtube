import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Player from "./ele/Player";
import { getAllVideo, searchTag } from "../../redux/modules/videoSlice";
import { StButton, StLabel } from "../../UI/StIndex";
import useIntersect from './useIntersect';

const Intro = () => {
  const { allVideos, searchedVideo, isLoaded, pageCount } = useSelector((state) => state.videoSlice);
  const { isLogedIn } = useSelector((state) => state.signSlice);
  const [lastId, setLastId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllVideo());
  }, []);

  const searchByTagHandler = (e) => {
    dispatch(searchTag(e.target.name));
  };  


  useEffect(() => {
    console.log(lastId);
    setLastId(allVideos[allVideos.length-1]?.postId);
  },[allVideos]);

  const [_, setRef] = useIntersect(async(entry, observer) =>{
    observer.unobserve(entry.target);
    console.log(allVideos);
    console.log(lastId);
    await dispatch(getAllVideo(lastId));
    console.log(1);
    observer.observe(entry.target);
  }, {lastId});
  
  return (
    <>
      <section>
        <StLabelContainer>
          <StLabel onClick={searchByTagHandler} name="전체">
            전체
          </StLabel>
          <StLabel onClick={searchByTagHandler} name="강아지">
            강아지
          </StLabel>
          <StLabel onClick={searchByTagHandler} name="반려동물">
            반려동물
          </StLabel>
          <StLabel onClick={searchByTagHandler} name="운동">
            운동
          </StLabel>
          <StLabel onClick={searchByTagHandler} name="패션">
            패션
          </StLabel>
        </StLabelContainer>
      </section>
      <section>
        <StAllVideoContainer>
          {searchedVideo === null ? (
            allVideos?.map((video, index) => {
              return <Player key={`player${index}`} video={video} />;
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
        {isLoaded && <p ref={setRef}>Loading...</p>}
      </section>
    </>
  );
};

export default Intro;

const StAllVideoContainer = styled.div`
  display:grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
	column-gap: 30px;
	row-gap: 10px;
  margin: 0 24px;
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

const StLabelContainer = styled.article`
  width: 100%;
  padding: 1rem 0;
  display: flex;
  justify-content: center;
  gap: 5px;
`;

