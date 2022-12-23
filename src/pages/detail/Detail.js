import React, { useEffect } from "react";
import ReactPlayer from "react-player";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetailVideo } from "../../redux/modules/videoSlice";

const Detail = () => {
  const { videoId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDetailVideo(videoId));
  }, []);

  return (
    <section>
      <article>
        <ReactPlayer
          url=""
          poster=""
          width="100%"
          height="100%"
          playing={true}
          muted={true}
          controls={true}
          light={false}
          pip={true}
          style
        />
      </article>
    </section>
  );
};

export default Detail;
