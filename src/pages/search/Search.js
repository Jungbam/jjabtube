import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { searchTitle } from "../../redux/modules/videoSlice";
import SearchPost from "./ele/SearchPost";

const Search = () => {
  const { searchedVideo } = useSelector((state) => state.videoSlice);
  console.log(searchedVideo);
  const { searchValue } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchTitle(searchValue));
  }, [searchedVideo]);

  return (
    <div>
      {searchedVideo?.map((video, i) => (
        <SearchPost key={`search${i}`} video={video} />
      ))}
    </div>
  );
};

export default Search;
