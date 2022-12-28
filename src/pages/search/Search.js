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
  }, [searchValue]);

  const [show, setShow] = useState(false);

  return (
    <>
      <StWrap>
        <StBtnContainer>
          <StToggleBtn
            onClick={() => {
              setShow(!show);
            }}
          >
            {show ? "hide" : "show"}
          </StToggleBtn>
          {show && <StWrapBtn />}

          <StFilter>
            <StWrapBtn>
              <StInnerTitle>업로드 날짜</StInnerTitle>
              <StBtn>지난 1시간</StBtn>
              <StBtn>오늘</StBtn>
              <StBtn>이번 주</StBtn>
              <StBtn>이번 달</StBtn>
              <StBtn>올해</StBtn>
            </StWrapBtn>

            <StWrapBtn>
              <StInnerTitle>정렬 기준</StInnerTitle>
              <StBtn>관련성</StBtn>
              <StBtn>업로드 날짜</StBtn>
              <StBtn>조회수</StBtn>
              <StBtn>평점</StBtn>
            </StWrapBtn>
          </StFilter>
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
  background-color: white;
  color: black;
`;

const StWrapBtn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-content: flex-start;
`;

const StInnerTitle = styled.p`
  font-size: 15px;
  font-weight: 600;
`;

const StFilter = styled.div`
  display: flex;
  gap: 20px;
  justify-content: flex-start;
`;
