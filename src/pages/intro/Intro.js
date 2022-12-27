import React from "react";
import styled from "styled-components";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteVideo, getAllVideo } from "../../redux/modules/videoSlice";

const Intro = () => {
  const dispatch = useDispatch();

  const post = useSelector((state) => state.videoSlice.allVideo);
  // console.log(post);

  useEffect(() => {
    dispatch(getAllVideo());
  }, [dispatch]);

  const deleteHandler = (id) => {
    dispatch(deleteVideo(id));
    console.log(id);
  };

  return (
    <>
      <button>label 1</button>
      <button>label 2</button>
      <button>label 3</button>

      <StContainer>
        <StWrap1>
          {post?.map((posts, index) => {
            return (
              <div key={index}>
                <StVideo></StVideo>
                <StWrap2>
                  <StTitle>{posts.title}</StTitle>
                  <StView>{posts.view}</StView>
                  <StNickname>{posts.nickname}</StNickname>
                  <button onClick={() => deleteHandler(posts.postId)}>
                    DELETE
                  </button>
                </StWrap2>
              </div>
            );
          })}
        </StWrap1>
      </StContainer>
    </>
  );
};

export default Intro;

const StContainer = styled.div`
  flex-wrap: wrap;
  gap: 20px;
`;

const StWrap1 = styled.div`
  display: flex;
  width: 1300px;
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
