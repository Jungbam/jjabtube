import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { searchTitle } from "../../redux/modules/videoSlice";
import SearchPost from "./ele/SearchPost";
import styled from "styled-components";

const Search = () => {
  const { searchedVideo } = useSelector((state) => state.videoSlice);
  const { searchValue } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchTitle(searchValue));
  }, [searchedVideo]);

  const [show, setShow] = useState(false);

  return (
    <>
      <StWrap>
        <StBtnContainer>
          <StToggleBtn>BTN</StToggleBtn>
          <StBtn>업로드날짜</StBtn>
          <StBtn>정렬기준</StBtn>
        </StBtnContainer>
      </StWrap>

      <div>
        {searchedVideo?.map((video, i) => (
          <SearchPost key={`search${i}`} video={video} />
        ))}
      </div>
    </>
  );
};

export default Search;

const StWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const StBtnContainer = styled.div``;

const StToggleBtn = styled.button`
  width: 90px;
  height: 30px;
  background-color: lightgray;
`;

const StBtn = styled.button`
  width: 90px;
  height: 30px;
  background-color: lightgray;
`;
