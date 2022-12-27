import React from "react";
import styled from "styled-components";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideo } from "../../redux/modules/videoSlice";

const Intro = () => {
  const dispatch = useDispatch();

  const post = useSelector((state) => state.videoSlice.allVideo.posts);
  console.log(post);

  useEffect(() => {
    dispatch(getAllVideo());
  }, [dispatch]);

  // post.map((posts, index) => {
  //   // return <div key={index}>posts</div>;
  //   console.log(posts);
  // });

  const map2 = [
    { number: 1, bbbb: "jj" },
    { number: 2, bbbb: "jj" },
    { number: 3, bbbb: "jj" },
    { number: 4, bbbb: "jj" },
    { number: 5, bbbb: "jj" },
  ];

  map2.map((item, index) => {
    console.log(item);
  });

  console.log(post);
  return (
    <>
      <button>label 1</button>
      <button>label 2</button>
      <button>label 3</button>
      <StContainer>
        <StWrap1>
          <StVideo></StVideo>
          <StWrap2>
            <StTitle>{}</StTitle>
            <StView>{}</StView>
            <StNickname>{}</StNickname>
          </StWrap2>
        </StWrap1>
      </StContainer>
    </>
  );
};

export default Intro;

const StContainer = styled.div`
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
